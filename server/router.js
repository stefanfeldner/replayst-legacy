const router = require('express').Router();
const { populateWithGenres } = require('./middleware/helpers');

const {
  createUser,
  getOwnedGames,
  addOwnedGame,
  addGenres,
  addPlatforms
} = require('./controllers/user');

router.post('/register', createUser);

// router.post('/genres', addGenres); // TODO delete
// router.post('/platforms', addPlatforms); TODO delete

router.get('/owned/:id', getOwnedGames);
router.put('/owned/:id', populateWithGenres, addOwnedGame);

module.exports = router;
