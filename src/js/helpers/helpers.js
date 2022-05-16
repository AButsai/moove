export const PATH_IMAGE = 'https://image.tmdb.org/t/p/w1280';
export const KEY_WATCHED = 'watched';
export const KEY_QUEUE = 'queue';
export const KEY_LAUNGES = 'launges';

export function ganres(data) {
  if (data.length > 2) {
    const str = data.slice(0, 2);
    return str + ',' + 'Others';
  }

  return data.slice(0, 2);
}

export const getItemLocalstorage = key => {
  const item = JSON.parse(localStorage.getItem(key));

  if (item !== null) {
    return item;
  }

  return [];
};

export function iterateArray(arr, id) {
  return [...arr].filter(film => film.id !== id);
}
