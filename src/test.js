const fs = require("fs");
const secrets = require("../secrets.json");

const {steam_session} = require("ts-steam-webapi");

const steam = new steam_session(secrets.key);

const rivals = 383980;
const starbound = 211820;
const celeste = 504230;
const stardew = 413150;
const deadcells = 588650;
const nucthrone = 242680;

void async function main() {
   const coalpha = await steam.ResolveVanityURL("coalpha");
   const games = await steam.GetOwnedGames(coalpha, {include_appinfo: true});
   console.log(`coalpha owns ${games.length} games: `);
   for (const game of games) {
      console.log(`${game.name} - ${(game.playtime_forever / 60).toFixed(1)}h`);
   }
}().catch(console.error.bind(console));
