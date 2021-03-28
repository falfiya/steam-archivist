pragma foreign_keys = on;

create table if not exists snapshot(
   epoch
      integer primary key not null,
   reason
      text
);

create table if not exists users(
   epoch
      integer not null,
   id
      integer(17) not null,
   primary key (epoch, id),
   foreign key (epoch) references snapshot(epoch)
);

create table if not exists leveling(
   epoch
      integer not null,
   user_id
      integer(17) not null,
   player_xp
      integer not null,
   player_level
      integer not null,
   player_xp_needed_to_level_up
      integer not null,
   player_xp_needed_current_level
      integer not null,
   primary key (epoch, user_id),
   foreign key (epoch) references snapshot(epoch),
   foreign key (epoch, user_id) references users(epoch, id)
);

create table if not exists user_game(
   epoch
      integer not null,
   user_id
      integer(17) not null,
   game_id
      integer not null,
   name
      text not null,

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

   primary key (epoch, user_id, game_id),
   foreign key (epoch) references snapshot(epoch),
   foreign key (epoch, user_id) references users(epoch, id)
);
