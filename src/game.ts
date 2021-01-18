import { GameId } from "./game_id";

export interface Game {
   id: GameId;
   name: string;
   hours: number;
   hours_2w: number;
   release_date: Date;
}
