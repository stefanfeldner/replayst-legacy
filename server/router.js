const router = require('express').Router();
const {
  populateWithGenres,
  populateWithPlatforms
} = require('./middleware/helpers');

const {
  createUser,
  getOwnedGames,
  addOwnedGame
} = require('./controllers/user');

router.post('/register', createUser);

router.get('/owned/:id', getOwnedGames);
router.put(
  '/owned/:id',
  populateWithGenres,
  populateWithPlatforms,
  addOwnedGame
);

module.exports = router;
