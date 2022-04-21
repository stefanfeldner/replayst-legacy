const apiKEY = 'key=52aeccdf84eb44f8932573f1bb164204';
const apiURL = 'https://api.rawg.io/api';
let page = 1;

export function getPopularGames() {
  return fetch(`${apiURL}/games?${apiKEY}&${page}&page_size=40`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => filterTileResult(res))
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
  source === 'DB' ? null : (url = `${apiURL}/games/${id}`); //TODO set url to fetch from DB
  return fetch(url)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => filterResult(res))
    .catch((err) => console.error(err, err.message));
}

export function filterTileResult(res) {
  const basicTiles = res.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
    };
  });
  return {
    next: res.next,
    results: basicTiles,
  };
}
