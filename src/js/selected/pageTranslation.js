import { KEY_LAUNGES } from '../helpers/helpers.js';

const translation = {
  home: {
    'en-US': 'home',
    'uk-UA': 'головна',
  },
  library: {
    'en-US': 'my library',
    'uk-UA': 'бібліотека',
  },
  watched: {
    'en-US': 'watched',
    'uk-UA': 'переглянуті',
  },
  queue: {
    'en-US': 'queue',
    'uk-UA': 'черга',
  },
  placeholder: {
    'en-US': 'Search Film',
    'uk-UA': 'Пошук',
  },
};

export function changeLanguage() {
  const language = localStorage.getItem(KEY_LAUNGES);
  document.querySelector('.lang_placeholder').placeholder = translation.placeholder[language];
  for (let key in translation) {
    if (key === 'placeholder') {
      return;
    }
    document.querySelector('.lang__' + key).innerHTML = translation[key][language];
  }
}
