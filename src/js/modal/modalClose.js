import getRefs from '../refs/getRefs.js';

const { overlay, closeModal } = getRefs();

export function modalCloseEsc(e) {
  if (e.key === 'Escape') {
    overlay.classList.add('visually-hidden');
    window.removeEventListener('keydown', modalCloseEsc);
  }
}

const modalClosed = () => {
  overlay.classList.add('visually-hidden');
  window.removeEventListener('keydown', modalCloseEsc);
};

closeModal.addEventListener('click', modalClosed);

overlay.addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    modalClosed();
  }
});
