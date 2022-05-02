import mongoose from "mongoose"

export interface developerInterface extends mongoose.Document  {
  id: number,
  name: string,
  slug: string
};

export default developerInterface;
