function getRefs() {
  return {
    // Header
    homeLink: document.querySelectorAll('[data-home]'),
    libraryLink: document.querySelector('[data-library]'),
    libraryWatched: document.querySelector('[data-watched]'),
    libraryQueue: document.querySelector('[data-queue]'),
    form: document.querySelector('.form'),
    header: document.querySelector('.header'),
    buttons: document.querySelector('.library__btns'),

    // Root
    root: document.querySelector('#root'),

    // Modal
    modal: document.querySelector('.modal'),
    overlay: document.querySelector('.overlay'),
    closeModal: document.querySelector('.modal__close'),
    containerCard: document.querySelector('.container__card'),

    // Footer
    footer: document.querySelector('.footer'),
  };
}

export default getRefs;
