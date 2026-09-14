begin;

create table if not exists public.learning_presence (
  namespace text not null,
  visitor_id uuid not null,
  seen_at timestamptz not null default now(),
  primary key (namespace, visitor_id)
);
create index if not exists learning_presence_seen on public.learning_presence(seen_at);
alter table public.learning_presence enable row level security;
revoke all on public.learning_presence from public, anon, authenticated;

create or replace function public.pmc_presence_heartbeat(p_namespace text, p_visitor uuid)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  active_count bigint;
  observed_at timestamptz;
begin
  if p_namespace is null or p_namespace !~ '^[a-zA-Z0-9:_-]{1,80}$' or p_visitor is null then
    raise exception 'Invalid presence parameters';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext('pmc-presence:' || p_namespace));
  observed_at := pg_catalog.clock_timestamp();
  delete from public.learning_presence
    where namespace = p_namespace and seen_at <= observed_at - interval '180 seconds';
  insert into public.learning_presence(namespace, visitor_id, seen_at)
    values (p_namespace, p_visitor, observed_at)
    on conflict (namespace, visitor_id) do update set seen_at = excluded.seen_at;
  select count(*) into active_count from public.learning_presence
    where namespace = p_namespace and seen_at > observed_at - interval '90 seconds';
  return active_count;
end;
$$;

revoke all on function public.pmc_presence_heartbeat(text, uuid) from public, anon, authenticated;
grant usage on schema public to service_role;
grant execute on function public.pmc_presence_heartbeat(text, uuid) to service_role;
notify pgrst, 'reload schema';

commit;
