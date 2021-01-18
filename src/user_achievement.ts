import { AchievementId } from "./achievement_id";

export interface UserAchievement {
   id: AchievementId;
   name: string;
   description: string;
   achieved: boolean;
   unlock_time: Date;
}
