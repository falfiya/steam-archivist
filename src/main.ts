const now = () => Math.floor(Date.now() / 1000);

import fs = require("fs");

import Sqlite3Database = require("better-sqlite3");

const db = new Sqlite3Database("../steam_archivist.sqlite3");

db.exec(fs.readFileSync("src/init.sql", "utf8"));

const new_user = db.prepare(/* sql */ `
   insert into users (id) values (?);
`);

import {GetScrapedGames, steam_session, steam_id} from "ts-steam-webapi";

const ss = new steam_session(require("../secrets.json").key);

void async function main() {
   const coalpha = steam_id(76561198280673707n);

   const friends = await ss.GetFriendList(coalpha);

   for (const friend of friends) {
      try {
         new_user.run(friend.steamid);
         
      } catch (e) {
         console.log(e);
      }
   }
   // const games = await GetScrapedGames("https://steamcommunity.com/id/coalpha");
   // console.log(games);
}().catch(console.error.bind(console));
