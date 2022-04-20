const router = require('express').Router();

const { createUser, getOwnedGames, addOwnedGame } = require('./controllers/user');


router.post('/register', createUser);

router.get('/owned/:id', getOwnedGames);
router.put('/owned/:id', addOwnedGame);

module.exports = router;