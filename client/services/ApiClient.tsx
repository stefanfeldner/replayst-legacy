import { FetchResult, Game, SearchResultType } from '../types/Game';
import { filterTileResult, filterSingleGameResult } from './Helpers';
const axios = require('axios').default;

const apiKEY = process.env.API_KEY;
const apiURL = process.env.API_URL;
const baseURL = 'http://localhost:3000';
let page = 1; // for dynamic pagination, no need for it atm cause we are given the "next" field

export async function getPopularGames() {
  try {
    console.log(`${apiURL}, ${apiKEY}`)
    const res = await fetch(`${apiURL}/games?${apiKEY}&${page}&page_size=40`);
    const popularGames: FetchResult = await res.json();
    return filterTileResult(popularGames);
  } catch (error) {
    console.error(error);
  }
}

export async function searchGamesFromAPI(key: string) {
  try {
    const res = await fetch(
      `${apiURL}/games?${apiKEY}&search=${key}&page_size=40`
    );
    const foundGames: SearchResultType = await res.json();
    return foundGames;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMore(url: string) {
  try {
    const res = await fetch(url);
    const fetchedGames: FetchResult = await res.json();
    return fetchedGames;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchOne(id: number, source: string) {
  try {
    if (source === 'DB') {
      const game = await axios.get(`${baseURL}/game/${id}`);
      return game.data;
    } else {
      const game = await axios.get(`${apiURL}/games/${id}?${apiKEY}`);
      filterSingleGameResult(game.data);
      return game.data;
    }
  } catch (error) {
    console.error(error);
  }
}
