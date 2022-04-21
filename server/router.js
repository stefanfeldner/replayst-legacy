const router = require('express').Router();

const {
  createUser,
  getOwnedGames,
  addOwnedGame,
  addGenres,
  addPlatforms
} = require('./controllers/user');

router.post('/register', createUser);

router.post('/genres', addGenres);
router.post('platforms', addPlatforms);

router.get('/owned/:id', getOwnedGames);
router.put('/owned/:id', addOwnedGame);

module.exports = router;
