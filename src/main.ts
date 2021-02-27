import { steam_session } from "ts-steam-webapi";

const {steam_api_key} = require("../secrets.json");

const ss = new steam_session(steam_api_key);

void async function main() {
   const id = await ss.ResolveVanityURL("coalpha");
   console.log(id);
}().catch(console.error.bind(console));
