const Genre = require('../models/genre');

async function populateWithGenres(req, res, next) {
  try {
    const genIds = req.body.genres.map((genre) => genre.id);
    const genres = await Genre.find({ id: { $in: genIds } });
    if (!genres) throw new Error();
    req.body.genres = genres.map((gen) => gen._id);
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

async function populateWithPlatforms(req, res, next) {
  try {
  } catch (error) {
    return res.sendStatus(401);
  }
}

module.exports = { populateWithGenres, populateWithPlatforms };
