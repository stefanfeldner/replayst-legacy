import {Express, Request, Response, NextFunction} from 'express';
import { Genre, GenreInterface } from '../models/genre';
import { Platform, PlatformInterface } from '../models/platform'

export async function populateWithGenres(req: Request, res: Response, next: NextFunction) {
  try {
    const genIds: number[] = req.body.game.genres.map((genre: GenreInterface) => genre.id);
    const genres = await Genre.find({ id: { $in: genIds } });
    if (!genres) throw new Error();
    req.body.game.genres = genres.map(gen => gen._id);
    next();
  } catch (error:any) {
    return res.sendStatus(401);
  }
}

// CHECK FUNCTIONALITY OF FRONTEND FILTERING, OTHERWISE PASS API OBJECT TO DB
export async function populateWithPlatforms(req: Request, res: Response, next: NextFunction) {
  try {
    const platIds: number[]  = req.body.game.platforms.map((p: PlatformInterface ) => p.id);
    const platforms= await Platform.find({ id: { $in: platIds } });
    if (!platforms) throw new Error();
    req.body.game.platforms = platforms.map(p => p._id);
    next();
  } catch (error:any) {
    return res.sendStatus(401);
  }
}
