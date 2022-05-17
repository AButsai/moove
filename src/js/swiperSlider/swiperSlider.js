import getRefs from '../refs/getRefs.js';
import ApiResponse from '../service/ApiResponse.js';
import { PATH_IMAGE } from '../helpers/helpers.js';

const { libraryLink, homeLink, swiperContainer } = getRefs();

const response = new ApiResponse();

const arrayPoster = [];

const getImgForSwiper = async () => {
  try {
    const responsForSwiper = await response
      .fetchForSwiper()
      .then(response => response.data.results);

    poster(responsForSwiper);

    const swiper = new Swiper('.swiper', {
      slidesPerView: 5.5,
      spaceBetween: 15,
      speed: 800,

      breakpoints: {
        320: {
          slidesPerView: 2.5,
          spaceBetween: 5,
        },

        768: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },

        1024: {
          slidesPerView: 5.5,
          spaceBetween: 15,
        },
      },

      preloadImages: false,

      lazy: {
        loadOnTransitionStart: false,
        loadPrevNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,

      autoplay: {
        delay: 1000,
      },

      virtual: {
        slides: (function () {
          const slides = [];
          for (const { poster, title, overview, release_date } of arrayPoster) {
            slides.push(`
            <div class="swiper__thumb">
                <img class="swiper__img swiper-lazy" data-src="${poster}" src="" alt="${title}" />
                <div class="thumb">
                    <h2 class="swipers__title">${title}</h2>
                    <p class="swipers__description">${substringString(overview)}</p>
                    <p class="swiper__date">${release_date}</p>
                </div>
            </div>
          `);
          }
          return slides;
        })(),
      },
    });

    swiperContainer.addEventListener('mouseover', () => {
      swiper.autoplay.stop();
    });
    swiperContainer.addEventListener('mouseout', () => {
      swiper.autoplay.start();
    });

    libraryLink.addEventListener('click', () => {
      swiperContainer.classList.add('visually-hidden');
    });
    homeLink.forEach(link => {
      link.addEventListener('click', () => {
        swiperContainer.classList.remove('visually-hidden');
      });
    });
  } catch (error) {
    console.error(error);
  }
};

function poster(data) {
  data.map(({ poster_path, title, overview, release_date }) => {
    arrayPoster.push({ poster: PATH_IMAGE + poster_path, title, overview, release_date });
  });
}

function substringString(str) {
  if (str.length < 400) {
    return str;
  }
  return str.substr(0, 410) + ' ...';
}

getImgForSwiper();
