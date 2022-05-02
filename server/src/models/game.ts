import mongoose from "mongoose";
import { genreInterface } from "./genre";
import developerInterface from "./developer";
import { platformInterface } from "./platform";

export interface gameInterface extends mongoose.Document {
  id: number,
  name: string,
  slug: string,
  description: string,
  metacritic: number,
  released: string,
  background_image: string,
  website: string,
  genres: genreInterface, //{type: ref: 'Genre' }
  platforms: platformInterface, //{type: ref: 'Genre' }
  developers: developerInterface //[Developer]
}

const newGame = new mongoose.Schema<gameInterface>({
  id: Number,
  name: String,
  slug: String,
  description: String,
  metacritic: Number,
  released: String,
  background_image: String,
  website: String,
  genres: [{ type: Schema.Types.ObjectId, ref: 'genreInterface' }],
  platforms: [{ type: Schema.Types.ObjectId, ref: 'platformInterface' }],
  developers: [{ type: Schema.Types.ObjectId, ref: 'developerInterface' }] //[Developer]
  // developers: [{ type: Schema.Types.ObjectId, ref: 'Developer' }] // TO REFACTOR IN PRODUCTION
});

const Game = mongoose.model<gameInterface>('Game', newGame);

export default Game;
