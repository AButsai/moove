import getRefs from '../refs/getRefs.js';

const { header, footer } = getRefs();
const headerHide = () => header.classList.contains('header__show');
const footerHide = () => footer.classList.contains('footer__show');
const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (scrollPosition() > lastScroll && !headerHide() && !footerHide()) {
    header.classList.add('header__show');
    footer.classList.add('footer__show');
    console.log('down');
  } else if (scrollPosition() < lastScroll && headerHide() && footerHide()) {
    header.classList.remove('header__show');
    footer.classList.remove('footer__show');
    console.log('up');
  }

  lastScroll = scrollPosition();
});
