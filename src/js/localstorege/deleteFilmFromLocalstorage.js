import { KEY_WATCHED, KEY_QUEUE, getItemLocalstorage } from '../helpers/helpers.js';

export function deleteFromLocalstorageWatched(id) {
  deleteFromLocalstorage(id, KEY_WATCHED);
}

export function deleteFromLocalstorageQueue(id) {
  deleteFromLocalstorage(id, KEY_QUEUE);
}

function deleteFromLocalstorage(id, key) {
  localStorage.setItem(
    key,
    JSON.stringify([...getItemLocalstorage(key)].filter(obj => obj.id !== id)),
  );
}
