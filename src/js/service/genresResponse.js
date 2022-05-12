import axios from 'axios';

const base_url =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=185a0ab5d7b155f2662fdcb8709753e2&language=en-US';

const fetchGenres = async () => {
  try {
    const response = await axios.get(base_url);
    return response;
  } catch (error) {
    return Promise.reject('Oops');
  }
};

export default fetchGenres;
