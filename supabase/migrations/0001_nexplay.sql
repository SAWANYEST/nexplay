-- NEXPLAY initial database. Apply ONLY to a new, dedicated Supabase project.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 180),
  title_ar text not null default '',
  description text not null default '',
  release_date date not null,
  developer text not null default '',
  publisher text not null default '',
  genre text not null default '',
  platforms text[] not null default '{}',
  price_sar numeric(10,2) not null default 0 check (price_sar>=0),
  cover_url text not null default '',
  backdrop_url text not null default '',
  gallery_urls text[] not null default '{}',
  trailer_id text not null default '',
  age_rating text not null default '',
  featured boolean not null default false,
  is_published boolean not null default false,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id uuid not null references public.games(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id,game_id)
);
create index if not exists games_public_idx on public.games(is_published,is_deleted,featured,release_date desc);
create index if not exists games_genre_idx on public.games(genre);
create index if not exists favorites_game_idx on public.favorites(game_id);

alter table public.admins enable row level security;
alter table public.games enable row level security;
alter table public.favorites enable row level security;

-- Only the user's own admin assignment is readable; no client insert, update or delete.
create policy "Read own admin membership" on public.admins for select to anon, authenticated using ((select auth.uid()) = user_id);
create policy "Read published games or administer" on public.games for select to anon, authenticated using (
  (is_published = true and is_deleted = false)
  or exists(select 1 from public.admins where user_id = (select auth.uid()))
);
create policy "Only admins create games" on public.games for insert to authenticated
  with check(exists(select 1 from public.admins where user_id = (select auth.uid())));
create policy "Only admins update games" on public.games for update to authenticated
  using(exists(select 1 from public.admins where user_id = (select auth.uid())))
  with check(exists(select 1 from public.admins where user_id = (select auth.uid())));
-- Games are soft-deleted from UI; no public DELETE policy.
create policy "Users view own favorites" on public.favorites for select to authenticated using ((select auth.uid())=user_id);
create policy "Users add own favorites" on public.favorites for insert to authenticated
  with check((select auth.uid())=user_id and exists(select 1 from public.games g where g.id=game_id and g.is_published and not g.is_deleted));
create policy "Users remove own favorites" on public.favorites for delete to authenticated using ((select auth.uid())=user_id);

-- Modern Supabase instances can require explicit privileges in addition to RLS.
grant select on public.admins to anon, authenticated;
grant select on public.games to anon, authenticated;
grant insert, update on public.games to authenticated;
grant select, insert, delete on public.favorites to authenticated;

-- Public promotional artwork bucket; writable only by admin identities.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('game-media','game-media',true,6291456,array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "Public view game media" on storage.objects for select to anon, authenticated
 using (bucket_id='game-media');
create policy "Admin upload game media" on storage.objects for insert to authenticated
 with check (bucket_id='game-media' and exists(select 1 from public.admins where user_id=(select auth.uid())));
-- Intentionally no general overwrite/delete privileges on media.
