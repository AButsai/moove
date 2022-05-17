import getRefs from '../refs/getRefs.js';

const {
  homeLink,
  header,
  libraryLink,
  form,
  buttons,
  libraryQueue,
  libraryWatched,
  containerSelect,
  containerCardGallery,
  root,
} = getRefs();

libraryLink.addEventListener('click', e => {
  console.log('e :>> ', e);
  header.classList.add('library');
  form.classList.add('hidden');
  buttons.classList.remove('hidden');
  homeLink[1].classList.remove('active-link');
  libraryLink.classList.add('active-link');
  containerSelect.classList.add('hidden');
  root.classList.add('cards-padding');
});

homeLink.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('library');
    form.classList.remove('hidden');
    buttons.classList.add('hidden');
    libraryLink.classList.remove('active-link');
    homeLink[1].classList.add('active-link');
    containerSelect.classList.remove('hidden');
    root.classList.remove('cards-padding');
  });
});

libraryWatched.addEventListener('click', () => {
  libraryQueue.classList.remove('active-btn');
  libraryWatched.classList.add('active-btn');
});

libraryQueue.addEventListener('click', () => {
  libraryQueue.classList.add('active-btn');
  libraryWatched.classList.remove('active-btn');
});
