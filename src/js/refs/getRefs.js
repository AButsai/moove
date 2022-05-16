function getRefs() {
  return {
    // Body
    body: document.querySelector('body'),
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
    modalTraler: document.querySelector('.mod-tralier'),

    // Footer
    footer: document.querySelector('.footer'),

    // Link Up
    linkUp: document.querySelector('.link-up'),

    // toogleLaungues
    containerSelect: document.querySelector('.container__select'),
    containerSelected: document.querySelector('.container__selected'),

    // Swiper
    swiperContainer: document.querySelector('.section-swiper'),
  };
}

export default getRefs;
