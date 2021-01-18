const fs = require("fs");

const SteamAPI = require("steamapi");
const secrets = JSON.parse(fs.readFileSync(__dirname + "/secrets.json"));

const steam = new SteamAPI(secrets.steam_api_key);

const rivals    = 383980;
const starbound = 211820;
const celeste   = 504230;
const stardew   = 413150;
const deadcells = 588650;
const nucthrone = 242680;

void async function main() {
   const coalpha = await steam.resolve("https://steamcommunity.com/id/coalpha/");
   const achi = await steam.getUserSummary(coalpha);
   console.log(achi);
   // const coalpha_stats = await steam.getUserStats(coalpha, celeste);
   // console.log(coalpha_stats);
   // const ownedGames = await steam.getUserOwnedGames(coalpha);
   // const coalpha_owned = await steam.getUserOwnedGames(coalpha);
   // console.log(coalpha_owned);
}().catch(console.error.bind(console));
