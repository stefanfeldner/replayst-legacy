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

// TODO refactor query with populated method
async function getOwnedGames(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('owned');
    console.log(user);
    res.status(200).send(user.owned);
  } catch (err) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

// could be changed to add game and specify the property in the body of the request?
async function addOwnedGame(req, res) {
  try {
    const { id } = req.params;
    const game = await Game.findOne({ id: req.body.id });
    //console.log('GAME=> ', game);
    if (!game) {
      const newGame = await Game.create(req.body);
      console.log('NEWGAME =>', newGame);
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
    // game.platforms = req.body.platforms.map((list) => list.platform);
    // const added = await User.findByIdAndUpdate(
    //   id,
    //   { $push: { owned: game } },
    //   { new: true }
    // );
    // res.status(201).send(added);
  } catch (error) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

// TODO move to middleware
// async function populateWithGenres(req, res, next) {
//   //console.log('REQUEST GENRES\n', req.body.genres);
//   const genIds = req.body.genres.map((genre) => genre.id);
//   const genres = await Genre.find({ id: { $in: genIds } });
//   return genres.map((gen) => gen._id);
// }

// TODO delete function and modules
// async function addGenres(req, res) {
//   try {
//     const { results } = req.body;
//     const genres = await Genre.create(results);
//     res.status(201).send(genres);
//   } catch (error) {
//     res.status(500).send({ error, message: 'Server error, try again' });
//   }
// }

// TODO delete function and modules
// async function addPlatforms(req, res) {
//   try {
//     const { results } = req.body;
//     const pf = results.map((res) => res.platforms).flat();
//     const platforms = await Platform.create(pf);
//     res.status(201).send(platforms);
//   } catch (error) {
//     res.status(500).send({ error, message: 'Server error, try again' });
//   }
// }

module.exports = {
  createUser,
  addOwnedGame,
  getOwnedGames
  // addPlatforms,
  // addGenres
};
