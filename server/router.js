const router = require('express').Router();
const {
  populateWithGenres,
  populateWithPlatforms
} = require('./middleware/helpers');

const {
  createUser,
  getOwnedGames,
  addOwnedGame,
  getOneGame
} = require('./controllers/user');

router.post('/register', createUser);

router.get('/owned/:id', getOwnedGames);

router.get('/game/:id', getOneGame);

router.put(
  '/owned/:id',
  populateWithGenres,
  populateWithPlatforms,
  addOwnedGame
);

module.exports = router;
