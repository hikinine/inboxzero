'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sandbox } from '@/sandbox/Sandbox';

// /preview/live?fit=center|full — recebe o código do pai via postMessage (formulário de novo item).
function Live() {
  const sp = useSearchParams();
  const fit = sp.get('fit') === 'full' ? 'full' : 'center';
  return <Sandbox live fit={fit} />;
}

export default function LivePreviewPage() {
  return (
    <Suspense fallback={null}>
      <Live />
    </Suspense>
  );
}
