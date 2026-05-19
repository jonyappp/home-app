-- Migration: 0001_home_tasks
-- Creates the Home Tasks schema.
-- Recurrence fields are embedded on the tasks table (no separate recurrence_rules table).
-- Simpler for H2; revisit if rules become complex enough to warrant extraction.
--
-- Manual Supabase setup required:
--   1. Create a Supabase project at https://app.supabase.com
--   2. Run this migration via the Supabase SQL editor or CLI:
--        supabase db push
--   3. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your
--      deployment environment (Vercel) and in .env.local for local development.
--   4. H3 will verify auth end-to-end and test RLS policies with a real session.

-- ─── Extensions ─────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ─── households ─────────────────────────────────────────────────────────────

create table households (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── household_members ───────────────────────────────────────────────────────

create table household_members (
  household_id  uuid not null references households (id) on delete cascade,
  user_id       uuid not null,
  created_at    timestamptz not null default now(),
  primary key (household_id, user_id)
);

-- ─── tasks ──────────────────────────────────────────────────────────────────

create table tasks (
  id                    uuid primary key default gen_random_uuid(),
  household_id          uuid not null references households (id) on delete cascade,
  title                 text not null,
  notes                 text,
  task_type             text not null,
  due_date              date,
  recurrence_frequency  text not null default 'none',
  recurrence_interval   int  not null default 1,
  is_archived           boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  constraint tasks_task_type_check
    check (task_type in ('recurring', 'one_off')),

  constraint tasks_recurrence_frequency_check
    check (recurrence_frequency in ('none', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly')),

  constraint tasks_recurrence_interval_positive
    check (recurrence_interval > 0),

  constraint tasks_title_not_empty
    check (length(trim(title)) > 0),

  -- Recurring tasks must have a due date and a non-none frequency.
  constraint tasks_recurring_requires_due_date
    check (
      task_type <> 'recurring'
      or (due_date is not null and recurrence_frequency <> 'none')
    )
);

-- ─── task_completion_events ──────────────────────────────────────────────────

create table task_completion_events (
  id                  uuid primary key default gen_random_uuid(),
  task_id             uuid not null references tasks (id) on delete cascade,
  completed_for_date  date not null,
  completed_at        timestamptz not null,
  notes               text,
  created_at          timestamptz not null default now(),

  -- Only one completion event per task per date.
  unique (task_id, completed_for_date)
);

-- ─── updated_at trigger ──────────────────────────────────────────────────────

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger households_set_updated_at
  before update on households
  for each row execute function set_updated_at();

create trigger tasks_set_updated_at
  before update on tasks
  for each row execute function set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
--
-- RLS is enabled now. Policies use auth.uid() + household_members.
-- H3 will verify these policies end-to-end once Supabase Auth is live.
-- Until H3, this schema should not be exposed to unauthenticated users in production.

alter table households enable row level security;
alter table household_members enable row level security;
alter table tasks enable row level security;
alter table task_completion_events enable row level security;

-- household_members: users can see their own membership row.
create policy "members_select_own"
  on household_members for select
  using (user_id = auth.uid());

-- No client-side self-join policy for H2.
-- H3 will define the controlled household bootstrap/onboarding path.
-- For v1 shared-login setup, create the household membership deliberately
-- through a trusted setup script, SQL editor, or server-only action.

-- households: members can read their household.
create policy "households_select_member"
  on households for select
  using (
    id in (
      select household_id from household_members where user_id = auth.uid()
    )
  );

-- tasks: members of the household can read and write tasks.
create policy "tasks_select_member"
  on tasks for select
  using (
    household_id in (
      select household_id from household_members where user_id = auth.uid()
    )
  );

create policy "tasks_insert_member"
  on tasks for insert
  with check (
    household_id in (
      select household_id from household_members where user_id = auth.uid()
    )
  );

create policy "tasks_update_member"
  on tasks for update
  using (
    household_id in (
      select household_id from household_members where user_id = auth.uid()
    )
  );

create policy "tasks_delete_member"
  on tasks for delete
  using (
    household_id in (
      select household_id from household_members where user_id = auth.uid()
    )
  );

-- task_completion_events: members of the task's household can manage completions.
create policy "completions_select_member"
  on task_completion_events for select
  using (
    task_id in (
      select t.id from tasks t
      join household_members hm on hm.household_id = t.household_id
      where hm.user_id = auth.uid()
    )
  );

create policy "completions_insert_member"
  on task_completion_events for insert
  with check (
    task_id in (
      select t.id from tasks t
      join household_members hm on hm.household_id = t.household_id
      where hm.user_id = auth.uid()
    )
  );

create policy "completions_delete_member"
  on task_completion_events for delete
  using (
    task_id in (
      select t.id from tasks t
      join household_members hm on hm.household_id = t.household_id
      where hm.user_id = auth.uid()
    )
  );
