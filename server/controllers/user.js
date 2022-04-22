const User = require('../models/user');
const Game = require('../models/game');
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

// refactored query with populated method
// TODO refactor after authentication for middleware obtained id (or API?)
async function getOwnedGames(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: 'owned',
      populate: { path: 'genres platforms' }
    });
    res.status(200).send(user.owned);
  } catch (err) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

// could be changed to add game and specify the property in the body of the request?
// TODO refactor after authentication for middleware obtained id (or API?)
async function addOwnedGame(req, res) {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ id: req.body.id });
    if (!game) {
      const newGame = await Game.create(req.body);
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { owned: newGame._id } },
        { new: true }
      );
      res
        .status(201)
        .send({ owned: user.owned, message: 'added to collection' });
    } else {
      const user = await User.findByIdAndUpdate(
        id,
        { $push: { owned: game._id } },
        { new: true }
      );
      res
        .status(201)
        .send({ owned: user.owned, message: 'added to collection' });
    }
  } catch (error) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

module.exports = {
  createUser,
  addOwnedGame,
  getOwnedGames
};
