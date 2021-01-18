import { GameId } from "./game_id";
import { GameLocalStatId } from "./game_local_stat_id";

export interface GameStat {
   game_id: GameId;
   id: GameLocalStatId;
   name: string;
}
