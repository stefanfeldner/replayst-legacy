const apiKEY = 'key=52aeccdf84eb44f8932573f1bb164204';
const apiURL = 'https://api.rawg.io/api';
const baseURL = 'http://localhost:3000';
let page = 1;

export function getPopularGames() {
  return fetch(`${apiURL}/games?${apiKEY}&${page}&page_size=40`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => filterTileResult(res))
    .catch((err) => console.error(err, err.message));
}

export function getUserCollection(id) {
  return fetch(`${baseURL}/owned/${id}`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => console.error(err, err.message));
}

export function fetchMore(url) {
  return fetch(url)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => filterTileResult(res))
    .catch((err) => console.error(err, err.message));
}

export function fetchOne(id, source) {
  let url = '';
  //TODO set url to fetch from DB
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

export function addGameToCollection(owner, game) {
  return fetch(`${baseURL}/owned/${owner}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game)
  })
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => console.error(err, err.message));
}

function filterSingleGameResult(res) {
  const platformList = res.platforms.map((single) => single.platform);
  let filteredDesc = res.description.replace(/<[^>]*>?/gm, '');
  filteredDesc = filteredDesc.slice().replace(/(&#39;s)/gm, '');

  const game = {
    id: res.id,
    name: res.name,
    slug: res.slug,
    description: filteredDesc,
    metacritic: res.metacritic,
    released: res.released,
    background_image: res.background_image,
    website: res.website,
    genres: res.genres,
    platforms: platformList,
    developers: res.developers
  };

  //console.log(JSON.stringify(game)); // TODO delete log

  return game;
}

function filterTileResult(res) {
  const basicTiles = res.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image
    };
  });
  const toPass = {
    next: res.next,
    results: basicTiles
  };
  return toPass;
}
