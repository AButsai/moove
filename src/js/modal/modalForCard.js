import { modalCloseEsc } from './modalClose.js';
import { PATH_IMAGE, ganres, KEY_LAUNGES } from '../helpers/helpers.js';
import { checkFilmsForWatched, checkFilmsForQueue } from '../library/library.js';
import { languageForBtnModal } from './languageForBtnModal.js';

function popularityToFixed(num) {
  return num.toFixed(1);
}

const marcupCardInModal = data => {
  const isWatched = checkFilmsForWatched(data.id);
  const isQueue = checkFilmsForQueue(data.id);

  window.addEventListener('keydown', modalCloseEsc);

  const { watched, watchedRemove, queue, queueRemove } = languageForBtnModal;
  const keyLanguage = localStorage.getItem(KEY_LAUNGES);

  const {
    genres,
    original_title,
    overview,
    popularity,
    poster_path,
    title,
    vote_average,
    vote_count,
  } = data;
  return `
    <div class="modal__container">
      <img class="modal__img" src="${PATH_IMAGE + poster_path}" alt="${title}" />
      <div class="modal__content">
        <h2 class="modal__title">${title}</h2>
        <ul class="modal__list">
          <li class="modal__item">
            <p class="modal__text">Vote / Votes</p>
            <p class="modal__votes-text modal__vote">${vote_average}</p>
            <span>/</span>
            <p class="modal__votes-text modal__vote modal__vote--votes">${vote_count}</p>
          </li>
          <li class="modal__item">
            <p class="modal__text">Popularity</p>
            <p class="modal__votes-text modal__votes">${popularityToFixed(popularity)}</p>
          </li>
          <li class="modal__item">
            <p class="modal__text">Original Title</p>
            <p class="modal__votes-text modal__votes modal__votes--title">${original_title}</p>
          </li>
          <li class="modal__item">
            <p class="modal__text">Genre</p>
            <p class="modal__votes-text modal__votes">${ganres(genres)}</p>
          </li>
        </ul>
        <div class="modal__content-wrap">
            <p class="modal__content-title">About</p>
            <p class="modal__content-description">${overview}</p>
        </div>
        <div class="modal__buttons">
        ${
          isWatched
            ? `<button class="modal__btn js-watched is-watched" type="button" data-watched="wathed">
              ${watchedRemove[keyLanguage]}
            </button>`
            : `<button class="modal__btn js-watched" type="button" ${
                isQueue && `disabled`
              } data-watched="wathed">
              ${watched[keyLanguage]}
            </button>`
        }
        ${
          isQueue
            ? ` <button class="modal__btn modal__btn--margin js-queue is-watched" type="button" data-queue="queue">
              ${queueRemove[keyLanguage]}
            </button>`
            : ` <button class="modal__btn modal__btn--margin js-queue" type="button"${
                isWatched && `disabled`
              } data-queue="queue">
              ${queue[keyLanguage]}
            </button>`
        }
        </div>

        <div class="modal__play-wrap">
          <button class="btn__play-modal" type="button"></button>
          <p class="modal__play-text">Play trailer</p>
        </div>
      </div>
    </div>
    `;
};

export default marcupCardInModal;
