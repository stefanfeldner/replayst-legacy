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
    const user = await User.findById(id).populate('owned');
    const ownedTiles = user.owned.map((game) => {
      return {
        _id: game._id,
        id: game.id,
        name: game.name,
        background_image: game.background_image
      };
    });
    res.status(200).send(ownedTiles);
  } catch (err) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

async function getOneGame(req, res) {
  try {
    const { id } = req.params;
    const game = await Game.findById(id).populate('genres platforms');
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

// could be changed to add game and specify the property in the body of the request?
// TODO refactor after authentication for middleware obtained id (or API?)
async function addOwnedGame(req, res) {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ id: req.body.id }).populate({
      path: 'genres platforms'
    });
    if (!game) {
      const newGame = await Game.create(req.body);
      await User.findByIdAndUpdate(
        id,
        { $push: { owned: newGame._id } },
        { new: true }
      );
      // TODO sends back owned games keys, should I send back the whole list
      // or maybe just the new game tile elements to be rendered? NO, BECAUSE GAMES OWNED CAN ONLY BE ADDED FROM
      // the API SIDE, things will change for favorites/wishlist, unless I want to graphically update the frontend
      // when added to collection.
      res.status(201).send({ added: newGame, message: 'Added to collection!' });
    } else {
      await User.findByIdAndUpdate(
        id,
        { $push: { owned: game._id } },
        { new: true }
      );
      // TODO handle the case in which the game already exists in our game database, we need to return the updated
      // details to be rendered. Or should we update them in the screen if we receive a positive status?
      // OR SHOULD WE PASS BACK THE WHOLE USER DETAILS? SOUNDS LIKE AN OVERKILL
      // ---> what if the user clicks on the tile again? <---
      res.status(201).send({ owned: game, message: 'Added to collection!' });
    }
  } catch (error) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

module.exports = {
  createUser,
  addOwnedGame,
  getOwnedGames,
  getOneGame
};
