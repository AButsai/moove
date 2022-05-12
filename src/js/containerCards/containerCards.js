import getRefs from '../refs/getRefs.js';
import createLiElement from '../card/renderCard.js';
import marcupCardInModal from '../modal/modalForCard.js';
import {
  saveFilmsForWatched,
  saveFilmsForQueue,
  deleteFilmsForWatched,
  deleteFilmsForQueue,
  checkFilmsForWatched,
  checkFilmsForQueue,
} from '../library/library.js';
import { watchedLocalStorege, queueLocalStorege } from '../localstorege/localstorege.js';
import {
  deleteFromLocalstorageWatched,
  deleteFromLocalstorageQueue,
} from '../localstorege/deleteFilmFromLocalstorage.js';

const { root, overlay, containerCard } = getRefs();

const marcupContainerCards = (data = []) => {
  const createUlContainer = `
    <div class="container container__cards">
    ${
      data.length === 0
        ? `<h2 class="library__info">You haven't selected any movies yet!</h2>`
        : `<ul class="gallery__list">${data.map(createLiElement).join('')}</ul>
        <div class="spinner hidden">
          <div class="spinner__ring"></div>
          <span class="spinner__text">loading...</span>
        </div>
        `
    }
    </div>
      `;

  root.innerHTML = createUlContainer;
  // root.insertAdjacentHTML('beforeend', createUlContainer);

  function addVisuallyHiddenToOverlay() {
    overlay.classList.add('visually-hidden');
  }

  const links = document.querySelectorAll('.gallery__link');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const idFromImg = e.currentTarget.id;
      data.filter(film => {
        if (film.id.toString() === idFromImg) {
          overlay.classList.remove('visually-hidden');
          containerCard.innerHTML = '';
          containerCard.innerHTML = marcupCardInModal(film);

          const watched = document.querySelector('.js-watched');
          const queue = document.querySelector('.js-queue');
          const { id } = film;
          const isWatched = checkFilmsForWatched(id);
          const isQueue = checkFilmsForQueue(id);

          watched.addEventListener('click', () => {
            if (isWatched) {
              deleteFromLocalstorageWatched(id);
              deleteFilmsForWatched(id);
              addVisuallyHiddenToOverlay();
              return;
            }

            saveFilmsForWatched(film);
            watchedLocalStorege(film);
            addVisuallyHiddenToOverlay();
          });

          queue.addEventListener('click', () => {
            if (isQueue) {
              deleteFromLocalstorageQueue(id);
              deleteFilmsForQueue(id);
              addVisuallyHiddenToOverlay();
              return;
            }

            saveFilmsForQueue(film);
            queueLocalStorege(film);
            addVisuallyHiddenToOverlay();
          });
        }
      });
    });
  });
};

export default marcupContainerCards;
