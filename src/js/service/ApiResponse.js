import axios from 'axios';

const KEY_API = '185a0ab5d7b155f2662fdcb8709753e2';
const BASE_URL = 'https://api.themoviedb.org/3/';
const language = 'en-US';

class ApiResponse {
  constructor() {
    this._searchName = '';
    this._page = 1;
    this._url = '';
    this._paramSearch = 'movie/popular';
  }

  async fetchResponse() {
    this._url = `${BASE_URL}${this._paramSearch}?api_key=${KEY_API}&language=${language}&page=${this._page}&query=${this._searchName}`;

    try {
      const response = await axios.get(this._url);
      this._page += 1;
      return response;
    } catch (error) {
      return Promise.reject('Oops');
    }
  }

  get searchName() {
    return this._searchName;
  }

  set searchName(newSearchName) {
    this._searchName = newSearchName;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }

  get paramSearch() {
    return this._paramSearch;
  }

  set paramSearch(newParamSearch) {
    this._paramSearch = newParamSearch;
  }
}

export default ApiResponse;
