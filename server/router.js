const router = require('express').Router();
const {
  populateWithGenres,
  populateWithPlatforms
} = require('./middleware/helpers');

const {
  createUser,
  getUserGames,
  addOwnedGame,
  removeOwnedGame,
  getOneGame
} = require('./controllers/user');

router.post('/register', createUser);

router.get('/list/:userId', getUserGames);

router.get('/game/:id', getOneGame);

router.put(
  '/owned/:userId',
  populateWithGenres,
  populateWithPlatforms,
  addOwnedGame
);

router.patch('/owned/:userId', removeOwnedGame);

module.exports = router;
