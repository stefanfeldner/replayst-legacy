const baseURL = 'http://localhost:3000';
import { Game } from '../types/Game';

export async function getUserCollection(id: string) {
  try {
    const res = await fetch(`${baseURL}/list/${id}`);
    const collection = await res.json();
    return collection;
  } catch (error) {
    console.error(error);
  }
}

export async function addGameToCollection(
  user: string,
  game: Game,
  list: string
) {
  try {
    const res = await fetch(`${baseURL}/owned/${user}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game, list }),
    });
    const addedGame = await res.json();
    return addedGame;
  } catch (error) {
    console.error(error);
  }
}

export async function removeFromCollection(
  user: string,
  gameId: string,
  list: string
) {
  try {
    const res = await fetch(`${baseURL}/owned/${user}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: gameId, list: list }),
    });
    const removedGame = await res.json();
    return removedGame;
  } catch (error) {
    console.error(error);
  }
}
