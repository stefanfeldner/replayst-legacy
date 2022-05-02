import mongoose from "mongoose"

export interface developerInterface extends mongoose.Document  {
  id: number,
  name: string,
  slug: string
};

const newDeveloper = new mongoose.Schema<developerInterface>({
  id: Number,
  slug: String,
  name: String
});

const Developer = mongoose.model<developerInterface>('Platform',  newDeveloper);

export { Developer }