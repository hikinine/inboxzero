export function ResultBadge({
  isValid,
  isDisposable,
  reason,
}: {
  isValid: boolean;
  isDisposable: boolean;
  reason?: string | null;
}) {
  const cls = {
    green: 'badge bg-emerald-500/10 text-emerald-400',
    amber: 'badge bg-amber-500/10 text-amber-400',
    red: 'badge bg-red-500/10 text-red-400',
    gray: 'badge bg-neutral-800 text-neutral-300',
  };

  if (isDisposable) return <span className={cls.amber}>descartável</span>;
  if (!isValid) {
    const label =
      reason === 'sem_registro_mx' ? 'domínio sem e-mail' : reason === 'caixa_inexistente' ? 'caixa não existe' : 'inválido';
    return <span className={cls.red}>{label}</span>;
  }
  if (reason === 'catch_all') return <span className={cls.amber}>catch-all</span>;
  if (reason === 'caixa_indeterminada' || reason === 'smtp_indisponivel')
    return <span className={cls.gray}>indeterminado</span>;
  return <span className={cls.green}>válido</span>;
}
