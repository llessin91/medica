import Link from 'next/link';
import { redirect } from 'next/navigation';
import { archivePatient, restorePatient } from '@/app/pacientes/actions';
import type { Patient } from '@/app/pacientes/types';
import { createClient } from '@/lib/supabase/server';

const notices: Record<string, string> = {
  created: 'Paciente cadastrado.',
  updated: 'Cadastro atualizado.',
  archived: 'Paciente arquivado. O registro foi preservado.',
  restored: 'Paciente restaurado à lista ativa.',
};

type PageProps = { searchParams: Promise<{ status?: string; view?: string }> };

function formatBirthDate(value: string | null) {
  if (!value) return null;
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

export default async function PatientsPage({ searchParams }: PageProps) {
  const { status, view } = await searchParams;
  const showArchived = view === 'arquivados';
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect('/login');

  let query = supabase.from('patients').select('id, display_name, birth_date, color, notes, archived_at').order('display_name', { ascending: true });
  query = showArchived ? query.not('archived_at', 'is', null) : query.is('archived_at', null);
  const { data, error } = await query;
  const patients = (data ?? []) as Patient[];

  return (
    <main className="page-shell">
      <header className="topbar">
        <div><p className="eyebrow">Área privada</p><h1>Pacientes</h1></div>
        <div className="topbar-actions">
          <Link className="button-link" href="/dashboard">Painel</Link>
          {!showArchived ? <Link className="button" href="/dashboard/pacientes/novo">Novo paciente</Link> : null}
        </div>
      </header>
      <nav className="tabs" aria-label="Visualização de pacientes">
        <Link aria-current={!showArchived ? 'page' : undefined} href="/dashboard/pacientes">Ativos</Link>
        <Link aria-current={showArchived ? 'page' : undefined} href="/dashboard/pacientes?view=arquivados">Arquivados</Link>
      </nav>
      {status && notices[status] ? <p className="notice" role="status">{notices[status]}</p> : null}
      {status === 'error' ? <p className="error" role="alert">Não foi possível concluir a operação. Atualize a lista e tente novamente.</p> : null}
      <section className="panel patient-list-panel" aria-labelledby="patient-list-title">
        <div className="list-heading"><div><h2 id="patient-list-title">{showArchived ? 'Pacientes arquivados' : 'Pacientes ativos'}</h2><p className="muted">{patients.length === 1 ? '1 registro' : `${patients.length} registros`}</p></div></div>
        {error ? <p className="error" role="alert">Não foi possível carregar os pacientes. Tente atualizar a página.</p> : patients.length === 0 ? (
          <div className="empty-state"><p>{showArchived ? 'Não há pacientes arquivados.' : 'Ainda não há pacientes cadastrados.'}</p>{!showArchived ? <Link className="button" href="/dashboard/pacientes/novo">Cadastrar primeiro paciente</Link> : null}</div>
        ) : (
          <ul className="patient-list">
            {patients.map((patient) => (
              <li className="patient-card" key={patient.id}>
                <span className="patient-color" aria-hidden="true" style={{ backgroundColor: patient.color ?? '#087e67' }} />
                <div className="patient-main">
                  <h3>{patient.display_name}</h3>
                  {patient.birth_date ? <p className="small muted">Nascimento: {formatBirthDate(patient.birth_date)}</p> : <p className="small muted">Sem data de nascimento</p>}
                </div>
                <div className="patient-actions">
                  {!showArchived ? <Link className="button-link" href={`/dashboard/pacientes/${patient.id}/editar`}>Editar</Link> : null}
                  <form action={showArchived ? restorePatient : archivePatient}>
                    <input type="hidden" name="id" value={patient.id} />
                    <button className="button-secondary" type="submit">{showArchived ? 'Restaurar' : 'Arquivar'}</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <p className="small muted footer-note">Arquivar preserva o registro; nenhum paciente é excluído definitivamente por esta tela.</p>
    </main>
  );
}
