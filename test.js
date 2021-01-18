const fs = require("fs");

const SteamAPI = require("steamapi");
const secrets = JSON.parse(fs.readFileSync(__dirname + "/secrets.json"));

const steam = new SteamAPI(secrets.steam_api_key);

const rivals = 383980;
const starbound = 211820;
const celeste = 504230;
const stardew = 413150;
const deadcells = 588650;
const nucthrone = 242680;

const userSummary = {
   avatar: {
      small: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4d/4de608cfec5432489dd676415ec9b13da2bbeb9d.jpg",
      medium: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4d/4de608cfec5432489dd676415ec9b13da2bbeb9d_medium.jpg",
      large: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4d/4de608cfec5432489dd676415ec9b13da2bbeb9d_full.jpg",
   },
   steamID: "76561198280673707",
   url: "https://steamcommunity.com/id/coalpha/",
   created: 1454274986,
   lastLogOff: 1610905162,
   nickname: "coalpha",
   realName: "coalpha",
   primaryGroupID: "103582791429521408",
   personaState: 1,
   personaStateFlags: 0,
   commentPermission: undefined,
   visibilityState: 3,
   countryCode: "US",
   stateCode: "CA",
   cityID: undefined,
   gameServerIP: undefined,
   gameServerSteamID: undefined,
   gameExtraInfo: undefined,
   gameID: undefined,
};

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
