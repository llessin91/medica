import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/auth/actions';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/login');

  return (
    <main className="page-shell">
      <header className="topbar">
        <div><p className="eyebrow">Área privada</p><h1>Controle pessoal</h1></div>
        <form action={signOut}><button className="button-secondary" type="submit">Sair</button></form>
      </header>
      <section className="panel">
        <p className="eyebrow">Sessão autenticada</p>
        <h2>Bem-vindo</h2>
        <p>Você entrou como <strong>{user.email ?? 'administrador'}</strong>.</p>
        <p className="muted">A área de pacientes já está disponível para organizar seus registros.</p>
        <Link className="button" href="/dashboard/pacientes">Acessar pacientes</Link>
      </section>
      <p className="small muted footer-note">Dados de saúde são sensíveis. Use somente após configurar e testar as políticas de acesso do banco.</p>
    </main>
  );
}
