import {steam_id} from "ts-steam-webapi";
import {archive_session} from "./archive_session";

const db_user_id = /* sql */ `integer(17) references users(id)`;

function init_db(this: archive_session) {
   const s = /* sql */ `
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
   `;
}

function archive_friends(this: archive_session, id: steam_id) {
   
}
