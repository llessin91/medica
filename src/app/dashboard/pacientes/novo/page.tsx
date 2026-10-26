import Link from 'next/link';
import { createPatient } from '@/app/pacientes/actions';
import { PatientForm } from '@/app/pacientes/PatientForm';

type PageProps = { searchParams: Promise<{ status?: string }> };

export default async function NewPatientPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  return (
    <main className="page-shell">
      <header className="topbar">
        <div><p className="eyebrow">Pacientes</p><h1>Novo paciente</h1></div>
        <Link className="button-link" href="/dashboard/pacientes">Voltar à lista</Link>
      </header>
      <section className="panel">
        <p className="muted">Cadastre apenas os dados necessários para organizar o acompanhamento.</p>
        {status === 'invalid' ? <p className="error" role="alert">Confira os campos. O nome é obrigatório; revise também os limites e formatos informados.</p> : null}
        {status === 'error' ? <p className="error" role="alert">Não foi possível salvar o cadastro. Tente novamente.</p> : null}
        <PatientForm action={createPatient} submitLabel="Cadastrar paciente" />
      </section>
      <p className="small muted footer-note">Os registros são privados e protegidos pelas regras de acesso do banco.</p>
    </main>
  );
}
