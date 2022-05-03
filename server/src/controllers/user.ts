import { Request, Response} from "express";
import bcrypt from 'bcrypt';
import config from "config";

import { Game, GameInterface } from "../models/game";
import { User, UserInterface } from "../models/user";
import log from "../utils/logger";

export async function createUser(req: Request, res: Response) {
  const { email, password }: {email: string, password: string} = req.body;
  const user:UserInterface = await User.findOne({ email });
  if (user) {
    return res.status(409).send({ error: '409', message: 'Wrong credentials' });
  }
  try {
    if (password === '') throw new Error();
    const pswd: string = await bcrypt.hash(password, config.get<number>('salt'));
    const newUser = await User.create({ ...req.body, password: pswd });
    res.status(201).send(newUser);
  } catch (err: any) {
    res.status(400).send({ err, message: 'Error, please retry' });
  }
}

export async function getUserGames(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userColl = await User.findById(userId)
      .select('owned wishlist favorites')
      .populate(
        'owned wishlist favorites',
        'id name metacritic released background_image'
      );
    res.status(200).send(userColl);
  } catch (err: any) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

export async function getOneGame(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const game: GameInterface = await Game.findOne({ id: +id }).populate('genres platforms');
    res.status(200).send(game);
  } catch (err: any) {
    res.status(500).send({ err, message: 'Server error, try again' });
  }
}

export async function addGameToUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { list } = req.body;
    const game: GameInterface = await Game.findOne({ id: req.body.game.id }).populate({
      path: 'genres platforms'
    });
    if (!game) {
      let newGame: GameInterface = await Game.create(req.body.game);
      await User.findByIdAndUpdate(
        userId,
        { $push: { [list]: { $each: [newGame._id], $position: 0 } } },
        { new: true }
      );
      newGame = await newGame.populate({ path: 'genres platforms' });
      res.status(201).send({ added: newGame, message: 'Added to collection!' });
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { [list]: game._id } },
        { new: true }
      );
      res.status(201).send({ added: game, message: 'Added to collection!' });
    }
  } catch (error: any) {
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}

export async function removeOwnedGame(req: Request, res: Response) {
  const { userId } = req.params;
  const { _id, list } = req.body; // : {_id: number list: }
  try {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { [list]: _id } },
      { new: true }
    );

    res.status(200).send({ id: _id });
  } catch (error: any) {
    log.error(error);
    res.status(500).send({ error, message: 'Server error, try again' });
  }
}
