import { PATH_IMAGE, ganres } from '../helpers/helpers.js';

function release(str) {
  return str.substr(0, 4);
}

const createLiElement = data => {
  const { poster_path, original_title, release_date, genres, id } = data;
  let img = '';

  if (poster_path) {
    img = PATH_IMAGE + poster_path;
  } else {
    img = 'https://github.com/AButsai/project-13/blob/dev/src/images/plug.jpg?raw=true';
  }

  return `
         <li class="gallery__item">
           <a href="#" class="gallery__link" id="${id}">
               <img class="gallery__img" src="${img}" alt="#" >
               <h2 class="gallery__title">${original_title}</h2>
               <span class="gallery__genres">${ganres(genres)}</span>
               <span class="gallery__genres">|</span>
               <span class="gallery__genres">${release(release_date)}</span>
           </a>
         </li>
       `;
};

export default createLiElement;
