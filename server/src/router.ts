import {Express, Request, Response} from "express"

import { populateWithGenres, populateWithPlatforms } from './middleware/helpers';

import {
  createUser,
  getUserGames,
  addGameToUser,
  removeOwnedGame,
  getOneGame
} from './controllers/user';

function routes(app: Express) {
  app.post('/register', createUser);

  app.get('/list/:userId', getUserGames);

  app.get('/game/:id', getOneGame);

  app.put(
    '/owned/:userId',
    populateWithGenres,
    populateWithPlatforms,
    addGameToUser
  );

  app.patch('/owned/:userId', removeOwnedGame);

  app.get('*', (req: Request, res: Response) => {
    res.status(404).send('Sorry, no data found 😔');
  });
}
export default routes;