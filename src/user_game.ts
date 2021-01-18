import { GameId } from "./game_id";
import { UserId } from "./user_id";

export interface UserGame {
   owner: UserId;
   game_id: GameId;
   playtime: number;
   l2w_playtime: number;
   last_played: Date | null;
}
