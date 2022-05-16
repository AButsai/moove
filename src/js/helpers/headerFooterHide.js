import getRefs from '../refs/getRefs.js';

const { header, footer, linkUp } = getRefs();
const headerHide = () => header.classList.contains('header__show');
const footerHide = () => footer.classList.contains('footer__show');
const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

const startHadeShow = 150;
const startHadeShowLinkUp = 500;
let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (
    scrollPosition() > lastScroll &&
    !headerHide() &&
    !footerHide() &&
    scrollPosition() > startHadeShow
  ) {
    header.classList.add('header__show');
    footer.classList.add('footer__show');
  } else if (scrollPosition() < lastScroll && headerHide() && footerHide()) {
    header.classList.remove('header__show');
    footer.classList.remove('footer__show');
  }

  if (scrollPosition() > startHadeShowLinkUp) {
    linkUp.classList.add('link-up__fixed');
  } else if (scrollPosition() < startHadeShowLinkUp) {
    linkUp.classList.remove('link-up__fixed');
  }

  lastScroll = scrollPosition();
});
