import mongoose from 'mongoose'

export interface genreInterface extends mongoose.Document {
  id: number,
  slug: string,
  name: string
};

const newGenre = new mongoose.Schema<genreInterface>({
  id: Number,
  slug: String,
  name: String,
})

const Genre = mongoose.model<genreInterface>('Genre', newGenre);

export default Genre
