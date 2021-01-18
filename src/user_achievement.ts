import { GameId } from "./game_id";
import { GameLocalAchievementId } from "./game_local_achievement_id";
import { UserId } from "./user_id";

export interface UserAchievement {
   user_id: UserId;

   game_id: GameId;
   id: GameLocalAchievementId;

   // /** Since hidden ones will have a description */
   // description: string;
   unlocked_at: Date;
}
