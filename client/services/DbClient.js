const baseURL = 'http://localhost:3000';

export async function getUserCollection(id) {
  return fetch(`${baseURL}/list/${id}`)
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => console.error(err, err.message));
}

export async function addGameToCollection(owner, game, list) {
  return fetch(`${baseURL}/owned/${owner}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ game: game, list: list })
  })
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => console.error(err, err.message));
}
