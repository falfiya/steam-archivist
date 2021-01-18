import { GameId } from "./game_id";

export interface Game {
   id: GameId;
   name: string;
   version: number;
   release_date: Date | null;
}
