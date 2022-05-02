import mongoose from "mongoose";
import { Genre, GenreInterface} from "./genre";
import { Developer, DeveloperInterface } from "./developer";
import { Platform, PlatformInterface } from "./platform";

export interface GameInterface extends mongoose.Document {
  id: number,
  name: string,
  slug: string,
  description: string,
  metacritic: number,
  released: string,
  background_image: string,
  website: string,
  genres: GenreInterface, // {type: ref: 'Genre' }
  platforms: PlatformInterface, // {type: ref: 'Genre' }
  developers: DeveloperInterface // [Developer]
}

const newGame = new mongoose.Schema<GameInterface>({
  id: Number,
  name: String,
  slug: String,
  description: String,
  metacritic: Number,
  released: String,
  background_image: String,
  website: String,
  genres: [{ type: mongoose.Types.ObjectId, ref: 'Genre' }],
  platforms: [{ type: mongoose.Types.ObjectId, ref: 'Platform' }],
  developers: [{ type: mongoose.Types.ObjectId, ref: 'Developer' }] // [Developer]
  // developers: [{ type: Schema.Types.ObjectId, ref: 'Developer' }] // TO REFACTOR IN PRODUCTION
});

const Game = mongoose.model<GameInterface>('Game', newGame);

export { Game }