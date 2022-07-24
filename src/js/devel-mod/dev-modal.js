import data from '../json/developers.json';
import getRefs from '../refs/getRefs.js';

const { containerCard, overlay, modal, body } = getRefs();

const link = document.querySelector('.footer__link');

link.addEventListener('click', () => {
  overlay.classList.remove('visually-hidden');
  overlay.classList.add('isScroll');
  modal.classList.add('isOpenModal');
  containerCard.innerHTML = '';
  containerCard.innerHTML = ul(data);
  body.classList.add('isOpenModal');
});

const ul = data => {
  return `<ul class="dev-grid__base">
  ${data
    .map(
      ({ name, github, photo, mail, linkedin }) =>
        `<li class="dev-grid__el">
            <img class="dev-img" src="${photo}" alt="${name}" width="180"
            height="170">
            <p class="dev-name">${name}</p>
            <div class="dev-icons">
            <a class="link-icons" href="${github}">
            <svg class="dev-git link-icon"></svg>
            </a>
            <a class="link-icons" href="${linkedin}">
            <svg class="dev-linkedin link-icon"></svg>
            </a>
            <a class="link-icons" href="mailto:${mail}">
            <svg class="dev-mail link-icon"></svg>
            </a>
            </dev>
            </li>`,
    )
    .join('')}
    </ul>`;
};
