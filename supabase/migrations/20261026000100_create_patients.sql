-- Foundation only: minimal patient ownership table. Medication and stock tables are intentionally out of scope.
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null check (length(btrim(display_name)) between 1 and 100),
  birth_date date,
  color text check (color is null or color ~ '^#[0-9A-Fa-f]{6}$'),
  notes text check (notes is null or length(notes) <= 500),
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists patients_owner_user_id_idx on public.patients(owner_user_id);
alter table public.patients enable row level security;
alter table public.patients force row level security;

revoke all on table public.patients from anon;
revoke all on table public.patients from authenticated;
grant select, insert, update on table public.patients to authenticated;

drop policy if exists "patients_select_own" on public.patients;
create policy "patients_select_own" on public.patients
  for select to authenticated using (owner_user_id = (select auth.uid()));

drop policy if exists "patients_insert_own" on public.patients;
create policy "patients_insert_own" on public.patients
  for insert to authenticated with check (owner_user_id = (select auth.uid()));

drop policy if exists "patients_update_own" on public.patients;
create policy "patients_update_own" on public.patients
  for update to authenticated
  using (owner_user_id = (select auth.uid()))
  with check (owner_user_id = (select auth.uid()));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;
drop trigger if exists patients_set_updated_at on public.patients;
create trigger patients_set_updated_at
  before update on public.patients
  for each row execute function public.set_updated_at();
