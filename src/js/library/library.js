import getRefs from '../refs/getRefs.js';
import marcupContainerCards from '../containerCards/containerCards.js';
import { KEY_WATCHED, KEY_QUEUE, getItemLocalstorage, iterateArray } from '../helpers/helpers.js';

const { libraryWatched, libraryQueue, libraryLink, root } = getRefs();

const watched = getItemLocalstorage(KEY_WATCHED);
const queue = getItemLocalstorage(KEY_QUEUE);

let watchedForRender = [];
let queuesForRender = [];

function addInArrayFromLocalstorage(array1, array2) {
  array1.push(...array2);
}

addInArrayFromLocalstorage(watchedForRender, watched);
addInArrayFromLocalstorage(queuesForRender, queue);

export function saveFilmsForWatched(film) {
  watchedForRender.push(film);
}

export function saveFilmsForQueue(film) {
  queuesForRender.push(film);
}

export function deleteFilmsForWatched(id) {
  watchedForRender = iterateArray(watchedForRender, id);
  marcupContainerCards(watchedForRender);
}

export function deleteFilmsForQueue(id) {
  queuesForRender = iterateArray(queuesForRender, id);
  marcupContainerCards(queuesForRender);
}

export function checkFilmsForWatched(id) {
  return iterateLocalstorage(id, watchedForRender);
}

export function checkFilmsForQueue(id) {
  return iterateLocalstorage(id, queuesForRender);
}

function iterateLocalstorage(id, arr) {
  for (const film of arr) {
    if (film.id.toString() === id.toString()) {
      return true;
    }
  }
  return false;
}

const handleLibrary = () => {
  root.innerHTML = '';
  marcupContainerCards(watchedForRender);
};

libraryWatched.addEventListener('click', handleLibrary);
libraryLink.addEventListener('click', handleLibrary);

libraryQueue.addEventListener('click', () => {
  root.innerHTML = '';
  marcupContainerCards(queuesForRender);
});
