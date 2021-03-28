const now = () => Math.floor(Date.now() / 1000);

import fs = require("fs");

import Sqlite3Database = require("better-sqlite3");

const db = new Sqlite3Database("steam_archivist_snapshots.sqlite3");

db.exec(fs.readFileSync("src/snapshot.sql", "utf8"));

import {GetScrapedGames, steam_session, steam_id, unwrap} from "ts-steam-webapi";

const ss = new steam_session(require("../secrets.json").key);

const db_snapshot = db.prepare(/* sql */ `
   insert into snapshot
   ( epoch
   , reason
   )
   values
   ( :epoch
   , :reason
   );
`);

const db_users = db.prepare(/* sql */ `
   insert into users
   ( epoch
   , id
   )
   values
   ( :epoch
   , :id
   );
`);

const db_leveling = db.prepare(/* sql */ `
   insert into leveling
   ( epoch
   , user_id
   , player_xp
   , player_level
   , player_xp_needed_to_level_up
   , player_xp_needed_current_level
   )
   values
   ( :epoch
   , :user_id
   , :player_xp
   , :player_level
   , :player_xp_needed_to_level_up
   , :player_xp_needed_current_level
   );
`);

const db_user_game = db.prepare(/* sql */ `
   insert into user_game
   ( epoch
   , user_id
   , player_xp
   , player_level
   , player_xp_needed_to_level_up
   , player_xp_needed_current_level
   )
   values
   ( :epoch
   , :user_id
   , :game_id
   , :name
   , :playtime_2weeks
   , :playtime_forever
   , :playtime_windows_forever
   , :playtime_mac_forever
   , :playtime_linux_forever
   , :last_played
   );
`);

const get_profile_url = <id extends steam_id>(id: id) =>
   `https://steamcommunity.com/profiles/${id}` as (
      `https://steamcommunity.com/profiles/${unwrap<typeof id>}`
   );

async function archive(ids: steam_id[], reason: string) {
   const res = await Promise.all(
      ids.map(id => Promise.all(
      [ id
      , ss.GetBadges(id)
      , ss.GetOwnedGames(id, {include_appinfo: true})
      , GetScrapedGames(get_profile_url(id))
      ]))
   );

   const epoch = now();
   db_snapshot.run({epoch, reason});
   for (const [id, leveling, owned_games, scraped_games] of res) {
      const user_id = id;

      db_users.run({epoch, id});
      {
         const
         { player_xp
         , player_level
         , player_xp_needed_to_level_up
         , player_xp_needed_current_level
         } = leveling;
         db_leveling.run(
            { epoch
            , user_id
            , player_xp
            , player_level
            , player_xp_needed_to_level_up
            , player_xp_needed_current_level
            }
         );
      }

      for (
         const
         { appid: game_id
         , playtime_2weeks
         , playtime_forever
         , playtime_windows_forever
         , playtime_mac_forever
         , playtime_linux_forever
         , name
         } of owned_games
      ) {
         const user_game_row =
         { epoch
         , user_id
         , game_id
         , name
         , playtime_2weeks
         , playtime_forever
         , playtime_windows_forever
         , playtime_mac_forever
         , playtime_linux_forever
         , last_played: null
         };

         const matching_scraped_game = scraped_games
            .find(scraped_game => scraped_game.appid === game_id);

         db_user_game.run(user_game_row);
      }
   }

   db.close();
};

const coalpha = steam_id(76561198280673707n);
const j1ng3rr = steam_id(76561198268253294n);

archive([coalpha, j1ng3rr], "manual").catch(console.error.bind(console));
