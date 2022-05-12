import { KEY_WATCHED, KEY_QUEUE } from '../helpers/helpers.js';

function localStoregSave(key, obj) {
  if (obj.length === 0) {
    return;
  }
  const item = JSON.parse(localStorage.getItem(key));
  const films = [];
  if (item !== null) {
    films.push(...item, obj);
  } else {
    films.push(obj);
  }

  localStorage.setItem(key, JSON.stringify(films));
}

export function watchedLocalStorege(data) {
  localStoregSave(KEY_WATCHED, data);
}

export function queueLocalStorege(data) {
  localStoregSave(KEY_QUEUE, data);
}
