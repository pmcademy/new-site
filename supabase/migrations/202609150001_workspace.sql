begin;
create table if not exists public.learner_workspaces (
 user_id uuid primary key references auth.users(id) on delete cascade,
 username text not null unique check (username ~ '^[a-z0-9][a-z0-9-]{2,39}$'),
 referral_code text not null unique default replace(gen_random_uuid()::text,'-',''),
 document jsonb not null,
 revision bigint not null default 0,
 updated_at timestamptz not null default now()
);
create table if not exists public.workspace_activity (
 user_id uuid not null references auth.users(id) on delete cascade,
 event_key text not null,
 lesson_key text not null,
 occurred_at timestamptz not null default now(),
 primary key (user_id,event_key)
);
alter table public.learner_workspaces enable row level security;
alter table public.workspace_activity enable row level security;
revoke all on public.learner_workspaces, public.workspace_activity from anon, authenticated;
grant all on public.learner_workspaces, public.workspace_activity to service_role;
create table if not exists public.workspace_referrals (
 id uuid primary key default gen_random_uuid(),
 referrer_id uuid not null references auth.users(id) on delete cascade,
 referred_id uuid not null unique references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 converted_at timestamptz,
 check(referrer_id <> referred_id)
);
alter table public.workspace_referrals enable row level security;
revoke all on public.workspace_referrals from anon, authenticated;
grant all on public.workspace_referrals to service_role;
create or replace function public.claim_workspace_referral(learner_id uuid,invite_code text) returns void
language plpgsql security definer set search_path='' as $$
declare owner_id uuid; joined_at timestamptz;
begin
 select created_at into joined_at from auth.users where id=learner_id for update;
 if joined_at is null or joined_at < now()-interval '7 days' then raise exception 'Invite ineligible'; end if;
 if exists(select 1 from public.lesson_progress where user_id=learner_id) then raise exception 'Already studying'; end if;
 select user_id into owner_id from public.learner_workspaces where referral_code=invite_code;
 if owner_id is null or owner_id=learner_id then raise exception 'Invalid invite'; end if;
 insert into public.workspace_referrals(referrer_id,referred_id) values(owner_id,learner_id) on conflict(referred_id) do nothing;
end;
$$;
revoke all on function public.claim_workspace_referral(uuid,text) from public,anon,authenticated;
grant execute on function public.claim_workspace_referral(uuid,text) to service_role;
create or replace function public.capture_workspace_lesson() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 insert into public.workspace_activity(user_id,event_key,lesson_key)
 values(new.user_id,'lesson:' || new.lesson_key,new.lesson_key) on conflict do nothing;
 update public.workspace_referrals set converted_at=now() where referred_id=new.user_id and converted_at is null;
 return new;
end;
$$;
revoke all on function public.capture_workspace_lesson() from public, anon, authenticated;
drop trigger if exists workspace_lesson_completed on public.lesson_progress;
create trigger workspace_lesson_completed after insert on public.lesson_progress
for each row execute function public.capture_workspace_lesson();
commit;
