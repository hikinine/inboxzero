interface LinearIssue {
  id:          string;
  title:       string;
  description: string | null;
  url:         string;
  priority:    number; // 0=no, 1=urgent, 2=high, 3=medium, 4=low
  state:       { name: string };
  team:        { name: string };
  updatedAt:   string;
  createdAt:   string;
}

interface LinearComment {
  id:      string;
  body:    string;
  url:     string;
  issue:   { id: string; title: string; url: string };
  updatedAt: string;
}

interface Connector {
  id:          string;
  workspaceId: string;
  type:        string;
  config:      Record<string, unknown>;
  lastSyncAt:  string | null;
}

async function graphql(apiKey: string, query: string, variables?: object): Promise<unknown> {
  const res = await fetch('https://api.linear.app/graphql', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': apiKey,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json() as { data?: unknown; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors[0]?.message);
  return json.data;
}

async function fetchAssignedIssues(apiKey: string, since: Date | null): Promise<LinearIssue[]> {
  const cutoff = since ?? new Date(Date.now() - 48 * 60 * 60 * 1000);

  const query = `{
    issues(
      filter: {
        assignee: { isMe: { eq: true } }
        updatedAt: { gt: "${cutoff.toISOString()}" }
      }
      orderBy: updatedAt
    ) {
      nodes {
        id title description url priority
        state { name }
        team  { name }
        updatedAt createdAt
      }
    }
  }`;

  const data = await graphql(apiKey, query) as { issues: { nodes: LinearIssue[] } };
  return data.issues?.nodes ?? [];
}

async function fetchMentions(apiKey: string, since: Date | null): Promise<LinearComment[]> {
  const cutoff = since ?? new Date(Date.now() - 48 * 60 * 60 * 1000);

  const query = `{
    comments(
      filter: {
        updatedAt: { gt: "${cutoff.toISOString()}" }
      }
    ) {
      nodes {
        id body url
        issue { id title url }
        updatedAt
      }
    }
  }`;

  try {
    const data = await graphql(apiKey, query) as { comments: { nodes: LinearComment[] } };
    return data.comments?.nodes ?? [];
  } catch {
    return [];
  }
}

async function ingestEvent(
  connector: Connector,
  payload: object,
  externalId: string,
  apiUrl: string,
): Promise<void> {
  const res = await fetch(`${apiUrl}/${connector.workspaceId}/events`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
      connectorId: connector.id,
      externalId,
      rawPayload:  payload,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ingest failed: ${res.status} ${text}`);
  }
}

async function updateLastSyncAt(connector: Connector, apiUrl: string): Promise<void> {
  await fetch(`${apiUrl}/${connector.workspaceId}/connectors/${connector.id}`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ lastSyncAt: new Date().toISOString() }),
  });
}

export async function pollLinear(connector: Connector, apiUrl: string): Promise<void> {
  const cfg = connector.config;
  const apiKey = cfg['apiKey'] as string | undefined;
  if (!apiKey) {
    console.log(`  [Linear] Conector ${connector.id} sem apiKey — pulando`);
    return;
  }

  const since = connector.lastSyncAt ? new Date(connector.lastSyncAt) : null;
  const sinceLabel = since ? since.toISOString() : 'últimas 48h';
  console.log(`  [Linear] Polling desde ${sinceLabel}...`);

  const enabledEvents = (cfg['events'] as string[] | undefined) ?? ['issueAssignedToYou'];

  let issueCount = 0;
  let mentionCount = 0;

  // Fetch issues assigned to me
  if (
    enabledEvents.includes('issueAssignedToYou') ||
    enabledEvents.includes('issueStatusChanged') ||
    enabledEvents.includes('issueCreated')
  ) {
    const issues = await fetchAssignedIssues(apiKey, since);
    for (const issue of issues) {
      await ingestEvent(
        connector,
        { source: 'linear_polling', type: 'Issue', action: 'sync', data: issue },
        `linear:Issue:${issue.id}`,
        apiUrl,
      );
      issueCount++;
    }
  }

  // Fetch comments mentioning me
  if (enabledEvents.includes('commentMention')) {
    const comments = await fetchMentions(apiKey, since);
    for (const comment of comments) {
      await ingestEvent(
        connector,
        { source: 'linear_polling', type: 'Comment', action: 'mention', data: comment },
        `linear:Comment:${comment.id}`,
        apiUrl,
      );
      mentionCount++;
    }
  }

  console.log(`  [Linear] ${issueCount} issue(s), ${mentionCount} menção(ões) ingeridas`);

  await updateLastSyncAt(connector, apiUrl);
}
