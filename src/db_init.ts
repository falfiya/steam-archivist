import fs = require("fs");

import Sqlite3Database = require("better-sqlite3");

const db = new Sqlite3Database("steam-archivist.sqlite3");
