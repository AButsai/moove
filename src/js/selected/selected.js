import { KEY_LAUNGES } from '../helpers/helpers.js';
import { changeLanguage } from './pageTranslation.js';
import getRefs from '../refs/getRefs.js';

const { containerSelected } = getRefs();
let laungesFromLocalStorage = localStorage.getItem(KEY_LAUNGES);

if (!laungesFromLocalStorage) {
  laungesFromLocalStorage = 'en-US';
}

changeLanguage();

const laungueses = [
  {
    name: 'en-US',
    value: 'EN',
  },
  {
    name: 'uk-UA',
    value: 'UA',
  },
];

const createBoxForOptions = markupOptions => {
  let selectedValue = '';
  for (const { name, value } of laungueses) {
    if (name === laungesFromLocalStorage) {
      selectedValue = value;
    }
  }
  return `
  <div class="select__box">
    <div class="options__container">
        ${markupOptions}
    </div>
    <div class="selected">${selectedValue}</div>
  </div>
  `;
};

const createContainerOptionForSelect = data => {
  return data
    .map(({ name, value }) => {
      return `
      <div class="options">
        <input id="${name}" class="radio" type="radio" name="category" />
        <label for="${name}">${value}</label>
      </div>
            `;
    })
    .join('');
};

containerSelected.innerHTML = createBoxForOptions(createContainerOptionForSelect(laungueses));

const optionContainer = document.querySelector('.options__container');
const selected = document.querySelector('.selected');
const optionList = document.querySelectorAll('.options');

selected.addEventListener('click', () => {
  optionContainer.classList.toggle('options__active');
});

optionList.forEach(el => {
  el.addEventListener('change', e => {
    selected.innerHTML = el.querySelector('label').innerHTML;
    optionContainer.classList.remove('options__active');

    const launges = e.currentTarget.children[0].id;
    localStorage.setItem(KEY_LAUNGES, launges);
    location.reload();
    changeLanguage();
  });
});
