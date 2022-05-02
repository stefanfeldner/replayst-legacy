import mongoose from "mongoose";

export interface PlatformInterface extends mongoose.Document {
  id: number,
  slug: string,
  name: string
};

const newPlatform = new mongoose.Schema<PlatformInterface>({
  id: Number,
  slug: String,
  name: String
});

const Platform = mongoose.model<PlatformInterface>('Platform', newPlatform);

export { Platform }