'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const patientPath = '/dashboard/pacientes';
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function readPatientForm(formData: FormData) {
  const displayName = String(formData.get('display_name') ?? '').trim();
  const birthDateValue = String(formData.get('birth_date') ?? '').trim();
  const colorValue = String(formData.get('color') ?? '').trim();
  const notes = String(formData.get('notes') ?? '').trim();
  const birthDate = birthDateValue || null;
  const color = colorValue || null;

  if (displayName.length < 1 || displayName.length > 100) return null;
  if (birthDate && (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate) || Number.isNaN(Date.parse(`${birthDate}T00:00:00Z`)) || new Date(`${birthDate}T00:00:00Z`).toISOString().slice(0, 10) !== birthDate || birthDate > new Date().toISOString().slice(0, 10))) return null;
  if (color && !/^#[0-9a-fA-F]{6}$/.test(color)) return null;
  if (notes.length > 500) return null;

  return { display_name: displayName, birth_date: birthDate, color, notes: notes || null };
}

export async function createPatient(formData: FormData) {
  const patient = readPatientForm(formData);
  if (!patient) redirect(`${patientPath}/novo?status=invalid`);

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect('/login');

  const { error } = await supabase.from('patients').insert({ ...patient, owner_user_id: user.id });
  if (error) redirect(`${patientPath}/novo?status=error`);

  revalidatePath(patientPath);
  redirect(`${patientPath}?status=created`);
}

export async function updatePatient(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const patient = readPatientForm(formData);
  if (!uuidPattern.test(id)) redirect(`${patientPath}?status=error`);
  if (!patient) redirect(`${patientPath}/${id}/editar?status=invalid`);

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect('/login');

  const { data, error } = await supabase
    .from('patients')
    .update(patient)
    .eq('id', id)
    .is('archived_at', null)
    .select('id')
    .maybeSingle();
  if (error || !data) redirect(`${patientPath}/${id}/editar?status=error`);

  revalidatePath(patientPath);
  revalidatePath(`${patientPath}/${id}/editar`);
  redirect(`${patientPath}?status=updated`);
}

export async function archivePatient(formData: FormData) {
  await changeArchiveState(formData, true);
}

export async function restorePatient(formData: FormData) {
  await changeArchiveState(formData, false);
}

async function changeArchiveState(formData: FormData, archive: boolean) {
  const id = String(formData.get('id') ?? '');
  if (!uuidPattern.test(id)) redirect(`${patientPath}?status=error`);

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect('/login');

  let query = supabase.from('patients').update({ archived_at: archive ? new Date().toISOString() : null }).eq('id', id);
  query = archive ? query.is('archived_at', null) : query.not('archived_at', 'is', null);
  const { data, error } = await query.select('id').maybeSingle();
  if (error || !data) redirect(`${patientPath}?status=error`);

  revalidatePath(patientPath);
  redirect(`${patientPath}?status=${archive ? 'archived' : 'restored'}`);
}
