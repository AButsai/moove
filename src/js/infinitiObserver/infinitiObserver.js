import { processingRequest } from '../service/processingRequest.js';

const infinitiObserver = () => {
  const options = {
    rootMargin: '0px 0px -50px 0px',
    threshold: 1.0,
  };
  const callback = function ([entry], observer) {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);

      const spinner = document.querySelector('.spinner');
      spinner.classList.remove('hidden');

      const setTimeoutId = setTimeout(() => {
        spinner.classList.add('hidden');

        processingRequest();
        clearTimeout(setTimeoutId);
      }, 1500);
    }
  };
  const observer = new IntersectionObserver(callback, options);
  const lastCard = document.querySelector('.gallery__item:last-child');

  if (lastCard) {
    observer.observe(lastCard);
  }
};

export default infinitiObserver;
