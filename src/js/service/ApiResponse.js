import axios from 'axios';
import { KEY_LAUNGES } from '../helpers/helpers.js';

const KEY_API = '185a0ab5d7b155f2662fdcb8709753e2';
const BASE_URL = 'https://api.themoviedb.org/3/';
const language = localStorage.getItem(KEY_LAUNGES);

class ApiResponse {
  constructor() {
    this._searchName = '';
    this._page = 1;
    this._url = '';
    this._paramSearch = 'movie/popular';
    this._videoIdForPopap = '';
  }

  async getVideoById() {
    const url = `${BASE_URL}/movie/${this._videoIdForPopap}/videos?api_key=${KEY_API}&language=${language}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.results[1]) {
      if (!data.results[0]) {
        return -1;
      }
      return data.results[0].key;
    }
    return data.results[1].key;
  }

  async fetchResponse() {
    this._url = `${BASE_URL}${this._paramSearch}?api_key=${KEY_API}&page=${this._page}&query=${this._searchName}&language=${language}`;

    try {
      const response = await axios.get(this._url);
      this._page += 1;
      return response;
    } catch (error) {
      return Promise.reject('Oops');
    }
  }

  async fetchForSwiper() {
    this._url = `${BASE_URL}movie/popular?api_key=${KEY_API}&page=${1}&language=${language}`;

    try {
      const response = await axios.get(this._url);
      this._page += 1;
      return response;
    } catch (error) {
      return Promise.reject('Oops');
    }
  }

  videoIdForPopap(id) {
    this._videoIdForPopap = id;
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
