import {make} from "./profile_url";
import {get_last_played} from "./web_scraper";

const coalpha = make("https://steamcommunity.com/id/coalpha");
if (coalpha == null) {
   console.error("Something is very very wrong");
   process.exit(1);
}

void async function main() {
   console.log(await get_last_played(coalpha));
}().catch(console.error.bind(console));
// const SteamAPI = require("steamapi");
// const secrets = JSON.parse(fs.readFileSync(__dirname + "/secrets.json"));

// module.exports = new SteamAPI(secrets.steam_api_key);
