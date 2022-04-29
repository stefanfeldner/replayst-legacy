import { filterTileResult, filterSingleGameResult } from './Helpers';

const apiKEY = process.env.API_KEY;
const apiURL = process.env.API_URL;
const baseURL = 'http://localhost:3000';
let page = 1; // for dynamic pagination, no need for it atm cause we are given the "next" field

export async function getPopularGames() {
  return fetch(`${apiURL}/games?${apiKEY}&${page}&page_size=40`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => filterTileResult(res))
    .catch((err) => console.error(err, err.message));
}

export async function searchGamesFromAPI(key) {
  return fetch(`${apiURL}/games?${apiKEY}&search=${key}&page_size=40`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
   // .then((res) => filterTileResult(res))
    .catch((err) => console.error(err, err.message));
}

export async function fetchMore(url) {
  return fetch(url)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => filterTileResult(res))
    .catch((err) => console.error(err, err.message));
}

export async function fetchOne(id, source) {
  if (source === 'DB') {
    return fetch(`${baseURL}/game/${id}`)
      .then((res) => (res.status < 400 ? res : Promise.reject(res)))
      .then((res) => res.json())
      .catch((err) => console.error(err, err.message));
  } else {
    return fetch(`${apiURL}/games/${id}?${apiKEY}`)
      .then((res) => (res.status < 400 ? res : Promise.reject(res)))
      .then((res) => res.json())
      .then((res) => filterSingleGameResult(res))
      .catch((err) => console.error(err, err.message));
  }
}
