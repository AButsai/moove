import { PATH_IMAGE, ganres } from '../helpers/helpers.js';

function release(str) {
  return str.substr(0, 4);
}

const createLiElement = data => {
  const { poster_path, title, release_date, genres, id } = data;

  let img = '';

  if (poster_path) {
    img = PATH_IMAGE + poster_path;
  } else {
    img = 'https://github.com/AButsai/moove/blob/main/src/images/plug.jpg?raw=true';
  }

  return `
         <li class="gallery__item">
           <a href="#" class="gallery__link" id="${id}">
            <div class="gallery__img-wrap">
               <img class="gallery__img" src="${img}" alt="#" >
               <button class="btn__play-card" type="button" value=${id}></button>
            </div>
            <div class="gallery__content">
              <h2 class="gallery__title">${title}</h2>
              <span class="gallery__genres">${ganres(genres)}</span>
              <span class="gallery__genres">|</span>
              <span class="gallery__genres">${release(release_date)}</span>
            </div>
           </a>
         </li>
       `;
};

export default createLiElement;
