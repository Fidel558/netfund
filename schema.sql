create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  level text check (level in ('100L','200L')),
  institution text,
  department text,
  password_hash text,
  form_unlocked boolean default false,
  created_at timestamptz default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  reference text unique not null,
  amount int not null,
  status text default 'pending',
  gateway text default 'paystack',
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  form_data jsonb,
  status text default 'submitted',
  submitted_at timestamptz default now()
);
