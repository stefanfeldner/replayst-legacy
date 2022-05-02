import mongoose from "mongoose"

export interface DeveloperInterface extends mongoose.Document  {
  id: number,
  name: string,
  slug: string
};

const newDeveloper = new mongoose.Schema<DeveloperInterface>({
  id: Number,
  slug: String,
  name: String
});

const Developer = mongoose.model<DeveloperInterface>('Platform',  newDeveloper);

export { Developer }