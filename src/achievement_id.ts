import { GameId } from "./game_id";

declare const _: unique symbol;
export type GameLocalAchievementId = string & { readonly [_]: unique symbol };

export interface AchievementId {
   game: GameId;
   local_id: GameLocalAchievementId;
};
