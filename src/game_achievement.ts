import { GameId } from "./game_id";
import { GameLocalAchievementId } from "./game_local_achievement_id";

export interface GameAchievement {
   game_id: GameId;
   id: GameLocalAchievementId;

   display_name: string;
   description: string | null;
   precent_unlocked: number;
}
