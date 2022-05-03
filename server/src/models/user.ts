import mongoose from "mongoose";
import { Game, GameInterface } from "./game";

export interface UserInterface extends mongoose.Document {
  email: string,
  nickname: string,
  name: string,
  surname: string,
  password: string,
  owned: GameInterface // [{ type: Schema.Types.ObjectId, ref: 'Game' }], 
  wishlist: GameInterface // [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  favorites: GameInterface // [{ type: Schema.Types.ObjectId, ref: 'Game' }]
};

const newUser = new mongoose.Schema<UserInterface>({
  email: { type: String, required: true },
  nickname: String,
  name: { type: String, required: true },
  surname: String,
  password: { type: String, required: true },
  owned: [{ type: mongoose.Types.ObjectId, ref: 'Game' }], //[{ game :{ type: Schema.Types.ObjectId, ref: 'Game' }, platforms: [platforms]]
  wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Game' }],
  favorites: [{ type: mongoose.Types.ObjectId, ref: 'Game' }]
});

const User = mongoose.model<UserInterface>('User', newUser);

export { User }
