-- tmdb cache
create table if not exists tmdb_cache (
  id bigserial primary key,
  tmdb_id int not null,
  media_type text not null, -- 'movie' or 'tv'
  payload jsonb not null,
  fetched_at timestamptz default now(),
  ttl_seconds int default 86400,
  unique (tmdb_id, media_type)
);

-- user catalog
create table if not exists user_catalog (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  tmdb_id int not null,
  media_type text not null,
  added_at timestamptz default now(),
  note text,
  favorite boolean default false,
  times_rewatched int default 0,
  last_watched_at timestamptz
);

create index on user_catalog (user_id);
create index on user_catalog (tmdb_id, media_type);

-- user status (one row per item)
create table if not exists user_status (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  catalog_id bigint references user_catalog(id) on delete cascade,
  status text not null, -- 'quero_assistir','assistindo','assistido','abandonei','reassistindo'
  updated_at timestamptz default now()
);

-- user ratings (general + by categories)
create table if not exists user_ratings (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  catalog_id bigint references user_catalog(id) on delete cascade,
  rating numeric(4,2), -- 0.00 - 10.00
  rating_by_categories jsonb, -- [{name,score,weight},...]
  rating_scale text default '0-10',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- user categories (customizable)
create table if not exists user_categories (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  weight numeric(5,02) default 0,
  sort integer default 0
);

-- episode progress (for TV)
create table if not exists episode_progress (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  tmdb_id int not null, -- tv id
  season_number int not null,
  episode_number int not null,
  watched boolean default false,
  watched_at timestamptz
);

create index on episode_progress (user_id, tmdb_id);
