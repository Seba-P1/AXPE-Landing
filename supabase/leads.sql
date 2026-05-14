create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_interest text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "Allow public lead inserts" on public.leads;
create policy "Allow public lead inserts"
on public.leads
for insert
to anon
with check (
  length(trim(name)) > 0
  and length(trim(email)) > 0
  and position('@' in email) > 1
  and length(trim(message)) > 0
);

drop policy if exists "Block public lead reads" on public.leads;
create policy "Block public lead reads"
on public.leads
for select
to anon
using (false);
