import {Express, Request, Response, NextFunction} from 'express'

const Genre = require('../models/genre');
const Platform = require('../models/platform');

async function populateWithGenres(req: Request, res: Response, next: NextFunction) {
  try {
    const genIds = req.body.game.genres.map(genre => genre.id);
    const genres = await Genre.find({ id: { $in: genIds } });
    if (!genres) throw new Error();
    req.body.game.genres = genres.map(gen => gen._id);
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

// CHECK FUNCTIONALITY OF FRONTEND FILTERING, OTHERWISE PASS API OBJECT TO DB
async function populateWithPlatforms(req: Request, res: Response, next: NextFunction) {
  try {
    const platIds = req.body.game.platforms.map(p => p.id);
    const platforms = await Platform.find({ id: { $in: platIds } });
    if (!platforms) throw new Error();
    req.body.game.platforms = platforms.map(p => p._id);
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export * from './helpers'
