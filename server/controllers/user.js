const User = require('../models/user');
const Game = require('../models/game');
const Genre = require('../models/genre');
const Platform = require('../models/platform');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).send({ error: '409', message: 'Wrong credentials' });
  }
  try {
    if (password === '') throw new Error();
    const pswd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: pswd });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ error, message: 'Error, please retry' });
  }
}

async function getOwnedGames(req, res) {
  try {
    const { id } = req.params;
    const { owned } = await User.findById(id);
    res.status(200).send(owned);
  } catch (err) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

// could be changed to add game and specify the property in the body of the request?
async function addOwnedGame(req, res) {
  try {
    const { id } = req.params;
    const game = req.body;
    game.platforms = req.body.platforms.map((list) => list.platform);
    const added = await User.findByIdAndUpdate(
      id,
      { $push: { owned: game } },
      { new: true }
    );
    res.status(201).send(added);
  } catch (error) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

// TODO delete function and modules
async function addGenres(req, res) {
  try {
    const genres = await Genre.create(req.body);
    res.status(201).send(genres);
  } catch (error) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

// TODO delete function and modules
async function addPlatforms(req, res) {
  try {
    const platforms = await Platform.create(req.body);
    res.status(201).send(platforms);
  } catch (error) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

module.exports = {
  createUser,
  addOwnedGame,
  getOwnedGames,
  addPlatforms,
  addGenres
};
