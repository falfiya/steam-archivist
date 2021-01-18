import { ProfileURL } from "./profile_url";
import { UserId } from "./user_id";

export interface User {
   id: UserId;  // resolve
   lvl: number; // GetUserLevel

   // GetUserSummary
   nickname: string;
   realname: string;

   join_date: Date;
   last_log_off: Date;

   country_code: string;
   state_code: string;

   url: ProfileURL;

   /**
    * This is the URL of the large one.
    * In the database, we're also going download and store the png in a separate
    * table with url -> blob
    */
   avatar: string;
}
