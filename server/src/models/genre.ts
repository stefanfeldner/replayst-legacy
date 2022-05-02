import mongoose from 'mongoose'

export interface GenreInterface extends mongoose.Document {
  id: number,
  slug: string,
  name: string
};

const newGenre = new mongoose.Schema<GenreInterface>({
  id: Number,
  slug: String,
  name: String,
})

const Genre = mongoose.model<GenreInterface>('Genre', newGenre);

export { Genre }
