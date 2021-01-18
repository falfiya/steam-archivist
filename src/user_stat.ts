import { GameId } from "./game_id";
import { GameLocalAchievementId } from "./game_local_achievement_id";

export interface UserStat {
   game_id: GameId;
   id: GameLocalAchievementId;

   /** Sorry, only numbers */
   value: number;
}
