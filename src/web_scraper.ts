import fs = require("fs");
import fetch from "node-fetch";
import {ProfileURL} from "./profile_url";

const RG_GAMES_0 = "var rgGames = ";
const RG_GAMES_1 = ";\n		var rgChangingGames = [];";

export async function get_all_games(profile: ProfileURL) {
   try {
      // const html = await
      //    fetch(`${profile}/games/?tab=all`)
      //       .then(res => res.text());
      const html      = fs.readFileSync(`${__dirname}/../cache/cached`, "utf8");
      const games_beg = html.indexOf(RG_GAMES_0) + RG_GAMES_0.length;
      const games_end = html.indexOf(RG_GAMES_1);
      const games_dat = html.slice(games_beg, games_end);
      return JSON.parse(games_dat);
   } catch (e) {
      // error handling, ladies and gentlemen
      console.error(e);
      console.warn("Something went wrong and I don't care enough to check");
      return null;
   }
}

const SECONDS_TO_MS = 1000;

export async function get_last_played(profile: ProfileURL) {
   const all_games = await get_all_games(profile);
   if (all_games == null) {
      return null;
   }

   const out: {[appid: string]: Date | "never played"} = Object.create(null);

   for (const { appid, last_played } of all_games) {
      if (appid === 440) {
         continue;
      }

      if (last_played) {
         out[appid] = new Date(last_played * SECONDS_TO_MS);
      } else {
         out[appid] = "never played";
      }
   }

   return out;
}
