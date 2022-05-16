import { KEY_WATCHED, KEY_QUEUE, KEY_LAUNGES } from '../helpers/helpers.js';

// localStorage.clear();

function localStoregSave(key, obj) {
  if (typeof obj === 'string') {
    console.log('obj :>> ', obj);
    localStorage.setItem(key, obj);
  }

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

export function launguesLocalStorage(data) {
  localStoregSave(KEY_LAUNGES, data);
}
