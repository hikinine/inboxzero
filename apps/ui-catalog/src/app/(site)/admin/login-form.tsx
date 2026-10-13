'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAction, type AdminState } from './actions';

export function AdminLoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<AdminState, FormData>(loginAction, {});
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="next" value={next} />
      <div className="space-y-1.5">
        <Label htmlFor="token">Token</Label>
        <Input id="token" name="token" type="password" autoComplete="current-password" required />
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full">
        Entrar
      </Button>
    </form>
  );
}
