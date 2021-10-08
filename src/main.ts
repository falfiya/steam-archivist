const now = () => Math.floor(Date.now() / 1000);

import fs = require("fs");

import Sqlite3Database = require("better-sqlite3");

const db = new Sqlite3Database("steam_archivist_snapshots.sqlite3");

db.exec(fs.readFileSync("src/snapshot.sql", "utf8"));

import {GetScrapedGames, steam_session, steam_id, unwrap, app_id} from "ts-steam-webapi";
import {owned_game_ex} from "ts-steam-webapi/dist/IPlayerService/GetOwnedGames/owned_game";
import {game} from "ts-steam-webapi/dist/IPlayerService";
import {scraped_game} from "ts-steam-webapi/dist/Web/GetScrapedGames/scraped_game";

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
   , game_id
   , name
   , playtime_2weeks
   , playtime_forever
   , playtime_windows_forever
   , playtime_mac_forever
   , playtime_linux_forever
   , last_played
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

import {keyInPause} from "readline-sync";
function gracefulExit() {
   keyInPause();
   db.close();
   process.exit(1);
}

async function archive(id: steam_id, epoch: number) {
   const [who] = await ss.GetPlayerSummaries([id]);
   console.log(`archiving ${who.personaname} (${who.realname})`);
   const leveling = await ss.GetBadges(id);
   const any_game: {[game_id: app_id]: owned_game_ex & scraped_game} = {};
   try {
      const scraped_games = await GetScrapedGames(`https://steamcommunity.com/profiles/${id}` as any);
      for (const scraped_game of scraped_games) {
         any_game[scraped_game.appid] = scraped_game as any;
      }
   }
   catch (e) {
      console.error(" ssue fetching scraped games");
      console.error(e);
   }

   try {
      const recent_games = await ss.GetRecentlyPlayedGames(id);
      for (const recent_game of recent_games) {
         any_game[recent_game.appid] = {...any_game[recent_game.appid], ...recent_game};
      }
   }
   catch (e) {
      console.error("fatal error fetching recent games. quitting...");
      console.error(e);
      gracefulExit();
   }

   try {
      const owned_games = await ss.GetOwnedGames(id, {include_appinfo: true});
      for (const owned_game of owned_games) {
         any_game[owned_game.appid] = {...any_game[owned_game.appid], ...owned_game};
      }
   }
   catch (e) {
      console.error("fatal error getting owned games. quitting...");
      console.error(e);
      gracefulExit();
   }

   db_users.run({epoch, id});
   db_leveling.run({...leveling, user_id: id, epoch});
   for (const [game_id, game] of Object.entries(any_game)) {
      if (game_id === "440") {
         continue;
      }
      console.log(`   ${game.name}@${game.playtime_forever} minutes`);
      db_user_game.run({
         epoch,
         user_id: id,
         game_id: game_id,
         name: game.name,
         playtime_2weeks: game.playtime_2weeks,
         playtime_forever: game.playtime_forever,
         playtime_windows_forever: game.playtime_windows_forever,
         playtime_mac_forever: game.playtime_mac_forever,
         playtime_linux_forever: game.playtime_linux_forever,
         last_played: game.last_played,
      });
   }
}

const coalpha = steam_id(76561198280673707n);
const j1ng3rr = steam_id(76561198268253294n);

void async function main() {
   const time_now = now();
   db_snapshot.run({epoch: time_now, reason: "manual"});
   await archive(coalpha, time_now);
   await archive(j1ng3rr, time_now);
   gracefulExit();
}();

