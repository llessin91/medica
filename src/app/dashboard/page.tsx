import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/login');

  return (
    <main className="page-shell">
      <header className="topbar">
        <div><p className="eyebrow">Área privada</p><h1>Fundação do sistema</h1></div>
        <form action={signOut}><button className="button-secondary" type="submit">Sair</button></form>
      </header>
      <section className="panel">
        <h2>Sessão autenticada</h2>
        <p>Você entrou como <strong>{user.email ?? 'administrador'}</strong>.</p>
        <p className="muted">A base de autenticação está pronta. As funções de pacientes, medicamentos e estoque ainda não fazem parte desta etapa.</p>
      </section>
      <p className="small muted footer-note">Dados de saúde são sensíveis. Use somente após configurar e testar as políticas de acesso do banco.</p>
    </main>
  );
}
