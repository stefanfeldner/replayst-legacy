import mongoose from "mongoose";
import { Game, gameInterface } from "./game";

export interface userInterface extends mongoose.Document {
  email: string,
  nickname: string,
  name: string,
  surname: string,
  password: string,
  owned: gameInterface //[{ type: Schema.Types.ObjectId, ref: 'Game' }], // TODO PLATFORM HIGHLIGHT [{ game :{ type: Schema.Types.ObjectId, ref: 'Game' }, platforms: [platforms]]
  wishlist: gameInterface //[{ type: Schema.Types.ObjectId, ref: 'Game' }],
  favorites: gameInterface //[{ type: Schema.Types.ObjectId, ref: 'Game' }]
};

const newUser = new mongoose.Schema<userInterface>({
  email: { type: String, required: true },
  nickname: String,
  name: { type: String, required: true },
  surname: String,
  password: { type: String, required: true },
  owned: [{ type: mongoose.Types.ObjectId, ref: 'Game' }], // TODO PLATFORM HIGHLIGHT [{ game :{ type: Schema.Types.ObjectId, ref: 'Game' }, platforms: [platforms]]
  wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Game' }],
  favorites: [{ type: mongoose.Types.ObjectId, ref: 'Game' }]
});

const User = mongoose.model<userInterface>('User', newUser);

export { User }
