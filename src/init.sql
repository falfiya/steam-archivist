pragma foreign_keys = on;

create table if not exists archive_event(
   epoch
      integer primary key not null,
   type
      text not null,
   reason
      text
);

create table if not exists users(
   id
      integer(17) primary key not null
);

create table if not exists users_event_tracked(
   epoch
      integer references archive_event(epoch),
   user_id
      integer(17) references users(id)
   primary key (epoch, user_id),
);

create table if not exists leveling(
   user_id
      integer(17) primary key references users(id),
   player_xp
      integer not null,
   player_level
      integer not null,
   player_xp_needed_to_level_up
      integer not null,
   player_xp_needed_current_level
      integer not null
);

create table if not exists friends(
   min_id
      integer(17) references users(id),
   max_id
      integer(17) references users(id),
   friend_since
      integer not null,
   relationship
      text not null,
   check (min_id < max_id),
   primary key (min_id, max_id)
);

create table if not exists friends_event_tracked(
   epoch
      integer references archive_event(epoch),
   min_id
      integer(17) references users(id),
   max_id
      integer(17) references users(id),
   check (min_id < max_id),
   primary key (epoch, min_id, max_id)
);

create table if not exists friends_event_untracked(
   epoch
      integer references archive_event(epoch),
   min_id
      integer(17) references users(id),
   max_id
      integer(17) references users(id),
   check (min_id < max_id),
   primary key (epoch, min_id, max_id)
);

create table if not exists friends_event_update(
   epoch
      integer references archive_event(epoch),
   min_id
      integer(17) references users(id),
   max_id
      integer(17) references users(id),
   friend_since
      integer not null,
   check (min_id < max_id),
   primary key (epoch, min_id, max_id)
);

create table if not exists games(
   id
      integer primary key not null,
   name
      text not null
);

create table if not exists user_game(
   user_id
      integer(17) references users(id),
   game_id
      integer references games(id),

   playtime_2weeks
      integer,
   playtime_forever
      integer not null,
   playtime_windows_forever
      integer not null,
   playtime_mac_forever
      integer not null,
   playtime_linux_forever
      integer not null,

   last_played
      integer,

   primary key (user_id, game_id)
);

create table if not exists user_game_event_tracked(
   epoch
      integer references archive_event(epoch),
   user_id
      integer(17) references users(id),
   game_id
      integer references games(id),

   primary key (epoch, user_id, game_id)
);

create table if not exists user_game_event_untracked(
   epoch
      integer references archive_event(epoch),
   user_id
      integer(17) references users(id),
   game_id
      integer references games(id),

   primary key (epoch, user_id, game_id)
);

create table if not exists user_game_event_update(
   epoch
      integer references archive_event(epoch),
   user_id
      integer(17) references users(id),
   game_id
      integer references games(id),

   playtime_2weeks
      integer,
   playtime_forever
      integer not null,
   playtime_windows_forever
      integer not null,
   playtime_mac_forever
      integer not null,
   playtime_linux_forever
      integer not null,

   last_played
      integer,

   primary key (epoch, user_id, game_id)
);
