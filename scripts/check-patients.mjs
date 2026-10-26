import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const read = (relative) => readFileSync(new URL(relative, root), 'utf8');
const actions = read('src/app/pacientes/actions.ts');
const list = read('src/app/dashboard/pacientes/page.tsx');
const createPage = read('src/app/dashboard/pacientes/novo/page.tsx');
const editPage = read('src/app/dashboard/pacientes/[id]/editar/page.tsx');
const form = read('src/app/pacientes/PatientForm.tsx');
const types = read('src/app/pacientes/types.ts');

for (const feature of [
  ['cadastro', /export async function createPatient/],
  ['edição', /export async function updatePatient/],
  ['arquivamento', /export async function archivePatient/],
  ['restauração', /export async function restorePatient/],
]) assert.match(actions, feature[1], `Ação de ${feature[0]} não encontrada`);

assert.match(actions, /auth\.getUser\(\)/, 'Ações precisam validar sessão no servidor');
assert.match(actions, /owner_user_id:\s*user\.id/, 'A propriedade deve vir do usuário autenticado');
assert.match(actions, /displayName\.length > 100/, 'Limite do nome não está validado no servidor');
assert.match(actions, /notes\.length > 500/, 'Limite de observações não está validado no servidor');
assert.match(actions, /birthDate > new Date\(\)\.toISOString\(\)\.slice\(0, 10\)/, 'Data de nascimento não pode ser futura');
assert.match(actions, /archived_at: archive \? new Date\(\)\.toISOString\(\) : null/, 'Arquivamento deve preservar o registro');
assert.doesNotMatch(actions, /\.delete\s*\(/, 'A interface de ações não pode apagar pacientes');
assert.match(list, /query\.is\('archived_at', null\)/, 'A lista ativa deve ocultar arquivados');
assert.match(list, /query\.not\('archived_at', 'is', null\)/, 'A lista arquivada deve filtrar registros arquivados');
assert.match(list, /archivePatient/);
assert.match(list, /restorePatient/);
assert.match(createPage, /createPatient/);
assert.match(editPage, /updatePatient/);
assert.match(editPage, /if \(patient\.archived_at\) redirect/, 'Paciente arquivado não deve ser editável pela tela ativa');
assert.match(editPage, /notFound\(\)/, 'Identificadores inválidos e pacientes inacessíveis não devem revelar dados');
assert.match(form, /maxLength=\{100\}/);
assert.match(form, /maxLength=\{500\}/);
assert.match(types, /archived_at: string \| null/);
console.log('Verificações estáticas do módulo de pacientes concluídas. Testes de UI e integração Supabase/RLS continuam pendentes.');
