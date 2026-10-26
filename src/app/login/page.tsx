import { signIn } from '@/app/auth/actions';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; setup?: string }> }) {
  const params = await searchParams;
  return (
    <main className="auth-shell">
      <section className="panel auth-panel" aria-labelledby="login-title">
        <p className="eyebrow">Acesso privado</p>
        <h1 id="login-title">Controle Pessoal de Medicamentos</h1>
        <p className="muted">Entre com a conta administradora. Não há cadastro público nesta versão.</p>
        {params.setup && <p className="notice" role="status">O ambiente ainda não está configurado. Consulte o guia de instalação.</p>}
        {params.error && <p className="error" role="alert">Não foi possível entrar. Confira os dados e tente novamente.</p>}
        <form action={signIn} className="form">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="username" required maxLength={254} />
          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required maxLength={1024} />
          <button type="submit">Entrar</button>
        </form>
        <p className="small muted">Ferramenta de organização. Não substitui orientações de profissionais de saúde.</p>
      </section>
    </main>
  );
}
