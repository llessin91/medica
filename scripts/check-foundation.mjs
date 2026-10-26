import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const read = (relative) => readFileSync(new URL(relative, root), 'utf8');
const migration = read('supabase/migrations/20261026000100_create_patients.sql');
const middleware = read('middleware.ts');
const dashboard = read('src/app/dashboard/page.tsx');
const envExample = read('.env.example');

for (const operation of ['select', 'insert', 'update']) {
  assert.match(migration, new RegExp(`for ${operation} to authenticated`, 'i'), `Policy ${operation} ausente`);
}
assert.equal((migration.match(/owner_user_id = \(select auth\.uid\(\)\)/g) ?? []).length, 4,
  'Esperadas cláusulas de isolamento em SELECT, INSERT e UPDATE (USING e WITH CHECK).');
assert.doesNotMatch(migration, /for delete to authenticated/i, 'Exclusão definitiva ainda não deve estar habilitada.');
assert.match(migration, /enable row level security/i);
assert.match(middleware, /auth\.getUser\(\)/);
assert.match(dashboard, /auth\.getUser\(\)/);
assert.doesNotMatch(envExample, /service_role|secret/i);
assert.ok(existsSync(new URL('docs/05-seguranca-e-rls.md', root)), 'Documentação de segurança ausente');
console.log('Verificações estáticas da fundação concluídas. Isso não é um teste de integração RLS.');
