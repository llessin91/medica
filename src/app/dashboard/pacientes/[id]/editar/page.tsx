import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { updatePatient } from '@/app/pacientes/actions';
import { PatientForm } from '@/app/pacientes/PatientForm';
import { createClient } from '@/lib/supabase/server';

type PageProps = { params: Promise<{ id: string }>; searchParams: Promise<{ status?: string }> };
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function EditPatientPage({ params, searchParams }: PageProps) {
  const [{ id }, { status }] = await Promise.all([params, searchParams]);
  if (!uuidPattern.test(id)) notFound();
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect('/login');
  const { data: patient, error } = await supabase.from('patients').select('id, display_name, birth_date, color, notes, archived_at').eq('id', id).maybeSingle();
  if (error || !patient) notFound();
  if (patient.archived_at) redirect('/dashboard/pacientes?status=archived');

  return (
    <main className="page-shell">
      <header className="topbar">
        <div><p className="eyebrow">Pacientes</p><h1>Editar cadastro</h1></div>
        <Link className="button-link" href="/dashboard/pacientes">Voltar à lista</Link>
      </header>
      <section className="panel">
        <p className="muted">Atualize os dados necessários. Alterações são preservadas no registro do paciente.</p>
        {status === 'invalid' ? <p className="error" role="alert">Confira os campos e os limites informados.</p> : null}
        {status === 'error' ? <p className="error" role="alert">Não foi possível salvar as alterações. Tente novamente.</p> : null}
        <PatientForm action={updatePatient} patient={patient} submitLabel="Salvar alterações" />
      </section>
    </main>
  );
}
