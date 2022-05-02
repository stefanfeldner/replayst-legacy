import mongoose from "mongoose";

export interface platformInterface extends mongoose.Document {
  id: number,
  slug: string,
  name: string
};

const newPlatform = new mongoose.Schema<platformInterface>({
  id: Number,
  slug: String,
  name: String
});

const Platform = mongoose.model<platformInterface>('Platform', newPlatform);

export { Platform }