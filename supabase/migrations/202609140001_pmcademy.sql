create table public.lesson_progress(user_id uuid not null references auth.users(id) on delete cascade,lesson_key text not null check(length(lesson_key)<=180 and lesson_key ~ '^0[1-6]/[a-z0-9-]+$'),completed_at timestamptz not null default now(),primary key(user_id,lesson_key));
alter table public.lesson_progress enable row level security;
create policy "Read own progress" on public.lesson_progress for select to authenticated using((select auth.uid())=user_id);
create policy "Add own progress" on public.lesson_progress for insert to authenticated with check((select auth.uid())=user_id);
create policy "Update own progress" on public.lesson_progress for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create policy "Remove own progress" on public.lesson_progress for delete to authenticated using((select auth.uid())=user_id);
grant select,insert,update,delete on public.lesson_progress to authenticated;
revoke all on public.lesson_progress from anon;
create table public.memberships(user_id uuid primary key references auth.users(id) on delete cascade,status text not null default 'inactive' check(status in('active','inactive','revoked')),payment_reference text,updated_at timestamptz not null default now());
alter table public.memberships enable row level security;
create policy "Read own membership" on public.memberships for select to authenticated using((select auth.uid())=user_id);
revoke all on public.memberships from anon,authenticated;
grant select on public.memberships to authenticated;
grant all on public.memberships to service_role;
create table public.learning_presence(namespace text not null,visitor_id uuid not null,seen_at timestamptz not null default now(),primary key(namespace,visitor_id));
create index learning_presence_seen on public.learning_presence(seen_at);
alter table public.learning_presence enable row level security;
revoke all on public.learning_presence from anon,authenticated;
create function public.pmc_presence_heartbeat(p_namespace text,p_visitor uuid) returns bigint language plpgsql security definer set search_path='' as $$
declare result bigint;
begin
 if length(p_namespace)>80 then raise exception 'Invalid namespace';end if;
 perform pg_advisory_xact_lock(hashtext('pmc-presence:'||p_namespace));
 delete from public.learning_presence where seen_at<now()-interval '180 seconds';
 insert into public.learning_presence(namespace,visitor_id,seen_at) values(p_namespace,p_visitor,now()) on conflict(namespace,visitor_id) do update set seen_at=excluded.seen_at;
 select count(*) into result from public.learning_presence where namespace=p_namespace and seen_at>now()-interval '90 seconds';return result;
end $$;
revoke all on function public.pmc_presence_heartbeat(text,uuid) from public,anon,authenticated;
grant execute on function public.pmc_presence_heartbeat(text,uuid) to service_role;
create table public.capstone_sessions(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,level_slug text not null check(level_slug ~ '^0[1-6]$'),token_hash text unique not null,created_at timestamptz not null default now(),expires_at timestamptz not null default now()+interval '24 hours',submission_id text unique,submitted_at timestamptz);
alter table public.capstone_sessions enable row level security;
create policy "Read own submissions" on public.capstone_sessions for select to authenticated using((select auth.uid())=user_id);
revoke all on public.capstone_sessions from anon,authenticated;
grant select(id,user_id,level_slug,created_at,expires_at,submission_id,submitted_at) on public.capstone_sessions to authenticated;
grant all on public.capstone_sessions to service_role;
create function public.pmc_accept_capstone(p_token_hash text,p_submission_id text,p_submitted_at timestamptz) returns text language plpgsql security definer set search_path='' as $$
declare ticket public.capstone_sessions;
begin
 select * into ticket from public.capstone_sessions where token_hash=p_token_hash for update;
 if not found then return 'ignored';end if;
 if ticket.submission_id=p_submission_id then return 'accepted';end if;
 if ticket.submission_id is not null or p_submitted_at>ticket.expires_at or p_submitted_at<ticket.created_at-interval '1 minute' or p_submitted_at>now()+interval '1 minute' then return 'ignored';end if;
 if not exists(select 1 from public.memberships where user_id=ticket.user_id and status='active') then return 'ignored';end if;
 update public.capstone_sessions set submission_id=p_submission_id,submitted_at=p_submitted_at where id=ticket.id;return 'accepted';
end $$;
revoke all on function public.pmc_accept_capstone(text,text,timestamptz) from public,anon,authenticated;
grant execute on function public.pmc_accept_capstone(text,text,timestamptz) to service_role;
