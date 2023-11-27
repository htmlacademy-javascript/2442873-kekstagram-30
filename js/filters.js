import { debounce } from './util.js';
import { showPictures } from './thumbnail.js';
import { initPictureListeners } from './big-picture.js';

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const RANDOM_FILTER_COUNT = 10;
const RANDOM_OFFSET = 0.5;

const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');
const pictureFilterElement = document.querySelector('.img-filters');

const filters = {
  [FilterType.DEFAULT]: (pictures) => pictures,
  [FilterType.RANDOM]: (pictures) => pictures.slice().sort(() => Math.random() - RANDOM_OFFSET).slice(0, RANDOM_FILTER_COUNT),
  [FilterType.DISCUSSED]: (pictures) => pictures.slice().sort((item1, item2) => item2.comments.length - item1.comments.length)
};

const toggleActiveClass = (evt) => {
  const currentFilterElement = document.querySelector('.img-filters__button--active');
  currentFilterElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const setFilter = (evt, filter, pictures) => {
  const filteredPictures = filters[filter](pictures);
  const picturesElement = document.querySelectorAll('.picture');
  picturesElement.forEach((picture) => picture.remove());
  showPictures(filteredPictures);
  initPictureListeners(filteredPictures);
};

const debouncedSetFilters = debounce(setFilter);

const initFilters = (pictures) => {
  pictureFilterElement.classList.remove('img-filters--inactive');
  filterDefaultElement.addEventListener('click', (evt) => {
    debouncedSetFilters(evt, FilterType.DEFAULT, pictures);
    toggleActiveClass(evt);
  });
  filterRandomElement.addEventListener('click', (evt) => {
    debouncedSetFilters(evt, FilterType.RANDOM, pictures);
    toggleActiveClass(evt);
  });
  filterDiscussedElement.addEventListener('click', (evt) => {
    debouncedSetFilters(evt, FilterType.DISCUSSED, pictures);
    toggleActiveClass(evt);
  });
};

export { initFilters };
