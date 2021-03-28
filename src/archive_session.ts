import type Sqlite3Database = require("better-sqlite3");
import type {steam_session} from "ts-steam-webapi";

export type archive_session = {
   db: Sqlite3Database.Database;
   steam_session: steam_session;
};
