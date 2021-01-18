pragma foreign_keys = on;
create table if not exists games(
   id integer(6) primary key,
   name text not null,
   version number not null
);

create table if not exists game_achievements(
   game_id integer(6) references games(id),
   id text,

   display_name text not null,
   description text,

   percent_unlocked real not null,

   primary key (game_id, id)
);

create table if not exists game_stats(
   game_id integer(6) references games(id),
   id text primary key,
   name text
);

create table if not exists avatars(
   url text primary key,
   large blob not null
);

create table if not exists users(
   id integer(17) primary key,
   lvl integer(3) not null,

   nickname text,
   realname text,

   join_epoch integer not null,
   last_log_off integer not null,

   country_code text,
   state_code text

   url text,

   avatar text references avatars(url)
);

create table if not exists user_games(
   owner integer(17)  references users(id),
   game_id integer(6) references games(id),

   playtime integer not null,
   l2w_playtime integer not null,
   last_played_epoch integer,

   primary key (owner, game_id)
);

create table if not exists user_achievements(
   user_id integer(17) references users(id),
   game_id integer(6)  references games(id),
   id text not null,
   unlocked_at_epoch integer not null,
   primary key (user_id, game_id, id)
);

-- look familiar?
-- I think they're the same thing under the hood?

create table if not exists user_stats(
   user_id integer(17) references users(id),
   game_id integer(6)  references games(id),
   id text not null,
   value integer not null,
   primary key (user_id, game_id, id)
);

create table if not exists friends(
   min_id integer(17) references users(id),
   max_id integer(17) references users(id),
   check (min_id < max_id)
);
