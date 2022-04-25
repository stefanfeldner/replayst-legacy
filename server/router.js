const router = require('express').Router();
const {
  populateWithGenres,
  populateWithPlatforms
} = require('./middleware/helpers');

const {
  createUser,
  getUserGames,
  addOwnedGame,
  getOneGame
} = require('./controllers/user');

router.post('/register', createUser);

router.get('/list/:id', getUserGames);

router.get('/game/:id', getOneGame);

router.put(
  '/owned/:id',
  populateWithGenres,
  populateWithPlatforms,
  addOwnedGame
);

module.exports = router;
