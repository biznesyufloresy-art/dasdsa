-- Wklej w Supabase > SQL Editor > New query > Run
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 product_id text not null,
 product_name text not null,
 discord_nick text not null,
 notes text not null default '',
 status text not null default 'new' check(status in ('new','contacted','paid','completed','cancelled')),
 created_at timestamptz not null default now()
);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
alter table public.orders enable row level security;
-- Brak zasad dostępu publicznego: dane dostępne tylko z serwera za pomocą secret key.
revoke all on public.orders from anon, authenticated;
