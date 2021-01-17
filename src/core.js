const fs = require("fs");

const SteamAPI = require("steamapi");
const secrets = JSON.parse(fs.readFileSync(__dirname + "/secrets.json"));

const steam = new SteamAPI(secrets.steam_api_key);

void async function main() {
   console.log(await steam.resolve("https://steamcommunity.com/id/coalpha/"));
}().catch(console.error.bind(console));
