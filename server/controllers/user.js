const User = require('../models/user');
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

module.exports = { createUser, addOwnedGame, getOwnedGames };
