import fetchGenres from './genresResponse.js';
import ApiResponse from './ApiResponse.js';
import marcupContainerCards from '../containerCards/containerCards.js';
import infinitiObserver from '../infinitiObserver/infinitiObserver.js';

import Notiflix from 'notiflix';
import getRefs from '../refs/getRefs.js';

const { form, root, homeLink } = getRefs();

const response = new ApiResponse();

let arrayObjectsFims = [];

export const processingRequest = async () => {
  try {
    const requestResponseFilms = await response
      .fetchResponse()
      .then(response => response.data.results)
      .catch(error => console.log(error));

    const requestResponseGenres = await fetchGenres().then(response => response.data.genres);
    createArrayObjects(requestResponseFilms, requestResponseGenres);
    infinitiObserver();
  } catch (error) {
    console.error(error);
    return Notiflix.Notify.failure(error.message);
  }
};

processingRequest();

homeLink.forEach(link => {
  link.addEventListener('click', () => {
    root.innerHTML = '';
    marcupContainerCards(arrayObjectsFims);
    infinitiObserver();
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  arrayObjectsFims = [];

  const { value } = e.currentTarget.name;

  if (value === '') {
    return Notiflix.Notify.info('Enter film name');
  }

  response.searchName = value.toLowerCase().trim();
  response.paramSearch = 'search/movie';
  response.page = 1;
  processingRequest();

  e.target.reset();
});

const createArrayObjects = async (films, genres) => {
  const arrayFilms = await films;
  const arrayGenres = await genres;

  arrayFilms
    .filter(film => {
      const { overview, poster_path, vote_average, title } = film;

      if ((poster_path !== null && overview !== '') || (poster_path !== '' && overview !== '')) {
        if (
          (poster_path !== null && vote_average !== 0) ||
          (poster_path !== '' && vote_average !== 0)
        ) {
          if (title !== '') {
            return film;
          }
        }
      }
    })
    .map(
      ({
        backdrop_path,
        genre_ids,
        id,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        vote_average,
        vote_count,
      }) => {
        const film = {
          backdrop_path,
          genres: [],
          id,
          original_title,
          overview,
          popularity,
          poster_path,
          release_date,
          title,
          vote_average,
          vote_count,
        };

        arrayGenres.map(({ id, name }) => {
          if (genre_ids.includes(id)) {
            film.genres.push(name);
          }
        });

        arrayObjectsFims.push(film);
      },
    );

  if (arrayObjectsFims.length === 0) {
    return Notiflix.Notify.failure('No film with this title has been found. Try again!');
  }

  // console.log('arrayObjectsFims :>> ', arrayObjectsFims);

  marcupContainerCards(arrayObjectsFims);
  infinitiObserver();
};
