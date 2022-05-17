import ApiResponse from '../service/ApiResponse.js';
import getRefs from '../refs/getRefs.js';
import createLiElement from '../card/renderCard.js';
import marcupCardInModal from '../modal/modalForCard.js';
import { createPlayer } from '../player/player.js';
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
import { KEY_LAUNGES } from '../helpers/helpers.js';
import { languageForTextLibrary } from './laungues.js';

const { root, overlay, containerCard, closeModal, body, modal } = getRefs();
const response = new ApiResponse();

const marcupContainerCards = (data = []) => {
  const { text } = languageForTextLibrary;
  let keyLanguage = localStorage.getItem(KEY_LAUNGES);
  if (!keyLanguage) {
    keyLanguage = 'en-US';
  }
  const createUlContainer = `
    <div class="container container__cards">
    ${
      data.length === 0
        ? `<h2 class="library__info">${text[keyLanguage]}</h2>`
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

  const getVideoInPopap = () => {
    overlay.classList.remove('visually-hidden');
    modal.classList.add('activ-tralier');
    containerCard.innerHTML = '';
    response.getVideoById().then(id => {
      containerCard.innerHTML = createPlayer(id);

      const modalClosed = () => {
        containerCard.innerHTML = createPlayer('');
        modal.classList.remove('activ-tralier');
      };
      closeModal.addEventListener('click', modalClosed);
      overlay.addEventListener('click', e => {
        if (e.target === e.currentTarget) {
          modalClosed();
        }
      });
    });
  };

  const linksPlay = document.querySelectorAll('.btn__play-card');
  linksPlay.forEach(play => {
    play.addEventListener('click', e => {
      const id = e.currentTarget.value;
      response.videoIdForPopap(id);
      getVideoInPopap();
    });
  });

  function addVisuallyHiddenToOverlay() {
    overlay.classList.add('visually-hidden');
  }

  const links = document.querySelectorAll('.gallery__link');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const idFromImg = e.currentTarget.id;

      data.map(film => {
        if (film.id.toString() === idFromImg) {
          body.classList.add('isOpenModal');
          overlay.classList.remove('visually-hidden');
          containerCard.innerHTML = '';
          containerCard.innerHTML = marcupCardInModal(film);
          const modalBtnPlayVideo = document.querySelector('.btn__play-modal');
          modalBtnPlayVideo.addEventListener('click', () => {
            response.videoIdForPopap(idFromImg);
            getVideoInPopap();
          });

          const watched = document.querySelector('.js-watched');
          const queue = document.querySelector('.js-queue');
          const { id } = film;
          const isWatched = checkFilmsForWatched(id);
          const isQueue = checkFilmsForQueue(id);

          watched.addEventListener('click', e => {
            e.preventDefault();
            body.classList.remove('isOpenModal');

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

          queue.addEventListener('click', e => {
            e.preventDefault();
            body.classList.remove('isOpenModal');
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
