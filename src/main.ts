const now = () => Math.floor(Date.now() / 1000);

import fs = require("fs");

import Sqlite3Database = require("better-sqlite3");

const db = new Sqlite3Database("steam_archivist_snapshots.sqlite3");

db.exec(fs.readFileSync("src/snapshot.sql", "utf8"));

import {GetScrapedGames, steam_session, steam_id} from "ts-steam-webapi";

const ss = new steam_session(require("../secrets.json").key);

const snapshot = db.prepare(/* sql */ `
   insert into snapshot values (:epoch, :reason);
`);

const users = db.prepare(/* sql */ `
   insert into users values (:epoch, :id);
`);

const leveling = db.prepare(/* sql */ `
   insert into leveling values
   ( :epoch
   , :user_id
   , :player_xp
   , :player_level
   , :player_xp_needed_to_level_up
   , :player_xp_needed_current_level
   );
`);

const user_game = db.prepare(/* sql */ `
   insert into user_game values
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

void async function main() {
   const coalpha = steam_id(76561198280673707n);
   const j1ng3rr = steam_id(76561198268253294n);

   const coalpha_leveling = await ss.GetBadges(coalpha);
   const j1ng3rr_leveling = await ss.GetBadges(j1ng3rr);

   const coalpha_owned_games = await ss.GetOwnedGames(coalpha, {include_appinfo: true});
   const j1ng3rr_owned_games = await ss.GetOwnedGames(j1ng3rr, {include_appinfo: true});

   const coalpha_scraped_games = await GetScrapedGames("https://steamcommunity.com/profiles/76561198280673707");
   const j1ng3rr_scraped_games = await GetScrapedGames("https://steamcommunity.com/profiles/76561198268253294");

   const epoch = now();

   snapshot.run({epoch, reason: "manual"});

   users.run({epoch, id: coalpha});
   users.run({epoch, id: j1ng3rr});

   leveling.run({epoch, user_id: coalpha, ...coalpha_leveling});
   leveling.run({epoch, user_id: j1ng3rr, ...j1ng3rr_leveling});

   for (const {
      appid,
      playtime_2weeks,
      playtime_forever,
      playtime_windows_forever,
      playtime_mac_forever,
      playtime_linux_forever,
      name,
   } of coalpha_owned_games) {
      const user_game_row = {
         epoch,
         user_id: coalpha,

         game_id: appid,
         name,
         playtime_2weeks,
         playtime_forever,
         playtime_windows_forever,
         playtime_mac_forever,
         playtime_linux_forever,
         last_played: null,
      };

      const matching_scraped_game = coalpha_scraped_games
         .find(scraped_game => scraped_game.appid === appid);

      if (matching_scraped_game !== undefined) {
         user_game_row.last_played = matching_scraped_game.last_played as never;
      }

      user_game.run(user_game_row);
   }

   for (const {
      appid,
      playtime_2weeks,
      playtime_forever,
      playtime_windows_forever,
      playtime_mac_forever,
      playtime_linux_forever,
      name,
   } of j1ng3rr_owned_games) {
      const user_game_row = {
         epoch,
         user_id: j1ng3rr,

         game_id: appid,
         name,
         playtime_2weeks,
         playtime_forever,
         playtime_windows_forever,
         playtime_mac_forever,
         playtime_linux_forever,
         last_played: null,
      };

      const matching_scraped_game = j1ng3rr_scraped_games
         .find(scraped_game => scraped_game.appid === appid);

      if (matching_scraped_game !== undefined) {
         user_game_row.last_played = matching_scraped_game.last_played as never;
      }

      user_game.run(user_game_row);
   }

   db.close();
}().catch(console.error.bind(console));
