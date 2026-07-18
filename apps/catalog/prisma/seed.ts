import { PrismaClient, ScreenStatus } from '@prisma/client';

const prisma = new PrismaClient();

function slugify(s: string): string {
  return (
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'tela'
  );
}

const frame = (title: string, body: string, bg = '#111116') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640">
  <rect width="360" height="640" rx="24" fill="${bg}"/>
  <rect x="120" y="18" width="120" height="6" rx="3" fill="#2a2a33"/>
  <text x="24" y="70" fill="#e6e6ea" font-family="sans-serif" font-size="22" font-weight="700">${title}</text>
  ${body}
</svg>`;

const SEED: Array<{ name: string; description: string; collection: string; tags: string[]; svg: string }> = [
  {
    name: 'Login — dark',
    description: 'Tela de login com e-mail e senha.',
    collection: 'Auth',
    tags: ['mobile', 'dark', 'login'],
    svg: frame(
      'Entrar',
      `<rect x="24" y="120" width="312" height="48" rx="12" fill="#1b1b22"/>
       <text x="40" y="149" fill="#6b6b78" font-family="sans-serif" font-size="14">seu@email.com</text>
       <rect x="24" y="180" width="312" height="48" rx="12" fill="#1b1b22"/>
       <text x="40" y="209" fill="#6b6b78" font-family="sans-serif" font-size="14">••••••••</text>
       <rect x="24" y="248" width="312" height="48" rx="12" fill="#22c55e"/>
       <text x="150" y="277" fill="#062f16" font-family="sans-serif" font-size="15" font-weight="700">Entrar</text>`,
    ),
  },
  {
    name: 'Dashboard — visão geral',
    description: 'Cards de métricas + lista.',
    collection: 'Tasky',
    tags: ['mobile', 'dark', 'dashboard'],
    svg: frame(
      'Hoje',
      `<rect x="24" y="100" width="150" height="90" rx="16" fill="#1b1b22"/>
       <text x="40" y="132" fill="#8b8b98" font-family="sans-serif" font-size="12">Pendentes</text>
       <text x="40" y="168" fill="#22c55e" font-family="sans-serif" font-size="28" font-weight="800">12</text>
       <rect x="186" y="100" width="150" height="90" rx="16" fill="#1b1b22"/>
       <text x="202" y="132" fill="#8b8b98" font-family="sans-serif" font-size="12">Concluídas</text>
       <text x="202" y="168" fill="#e6e6ea" font-family="sans-serif" font-size="28" font-weight="800">34</text>
       <rect x="24" y="206" width="312" height="56" rx="14" fill="#151519"/>
       <rect x="24" y="270" width="312" height="56" rx="14" fill="#151519"/>
       <rect x="24" y="334" width="312" height="56" rx="14" fill="#151519"/>`,
    ),
  },
  {
    name: 'Onboarding — boas-vindas',
    description: 'Primeira tela do onboarding.',
    collection: 'Auth',
    tags: ['mobile', 'onboarding'],
    svg: frame(
      'Bem-vindo',
      `<circle cx="180" cy="220" r="70" fill="#22c55e" opacity="0.15"/>
       <circle cx="180" cy="220" r="44" fill="#22c55e"/>
       <text x="24" y="380" fill="#e6e6ea" font-family="sans-serif" font-size="18" font-weight="700">Sua central de triagem</text>
       <text x="24" y="408" fill="#8b8b98" font-family="sans-serif" font-size="14">Tudo que importa, em um só lugar.</text>
       <rect x="24" y="560" width="312" height="48" rx="12" fill="#22c55e"/>
       <text x="150" y="589" fill="#062f16" font-family="sans-serif" font-size="15" font-weight="700">Começar</text>`,
      '#0d0d10',
    ),
  },
];

async function main() {
  for (const s of SEED) {
    const cslug = slugify(s.collection);
    const col = await prisma.collection.upsert({
      where: { slug: cslug },
      create: { slug: cslug, name: s.collection },
      update: {},
    });

    const tagIds: string[] = [];
    for (const t of s.tags) {
      const tslug = slugify(t);
      const tag = await prisma.tag.upsert({ where: { slug: tslug }, create: { slug: tslug, name: t }, update: {} });
      tagIds.push(tag.id);
    }

    const slug = slugify(s.name);
    await prisma.screen.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name: s.name,
        description: s.description,
        svg: s.svg,
        width: 360,
        height: 640,
        status: ScreenStatus.PUBLISHED,
        source: 'import',
        collectionId: col.id,
        tags: { create: tagIds.map((tagId) => ({ tagId })) },
      },
    });
    console.log(`seed: ${s.name}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
