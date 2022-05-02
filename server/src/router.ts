import {Express, Request, Response} from "express"
import middleware from './middleware'

import { populateWithGenres, populateWithPlatforms } from 'middleware';

import {
  createUser,
  getUserGames,
  addGameToUser,
  removeOwnedGame,
  getOneGame
} from 'controllers';

function routes(router: Express) {
  router.post('/register',(req: Request, res: Response) => createUser);

  router.get('/list/:userId', getUserGames);

  router.get('/game/:id', getOneGame);

  router.put(
    '/owned/:userId',
    populateWithGenres,
    populateWithPlatforms,
    addGameToUser
  );

  router.patch('/owned/:userId', removeOwnedGame);

  router.get('*', (req: Request, res: Response) => {
    res.status(404).send('Sorry, not found 😔');
  });
}
export default routes;