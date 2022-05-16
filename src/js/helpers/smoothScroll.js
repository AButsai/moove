export default function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery__list')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}
