import {shuffleArray, debounce} from './util.js';
import {createPhotos} from './picture.js';
import {openBigPicture} from './create-big-picture.js';

const RANDOM_PHOTOS_AMOUNT = 10;

const filterContainerElement = document.querySelector('.img-filters');
const filterFormElement = filterContainerElement.querySelector('.img-filters__form');

const toggleActiveFilter = (target) => {
  const filterButtonElements = filterFormElement.querySelectorAll('.img-filters__button');

  filterButtonElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
    button.disabled = false;
  });

  target.classList.add('img-filters__button--active');
  target.disabled = true;
};

const addFilterToggleEventListener = () => {
  filterContainerElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (evt.target.matches('.img-filters__button') && !evt.target.matches('.img-filters__button--active') ) {
      toggleActiveFilter(evt.target);
    }
  });
};

const filterPhotos = (photos) => {
  const defaulFilterButtonElment =filterFormElement.querySelector('#filter-default');
  const randomFilterButtoElement =filterFormElement.querySelector('#filter-random');
  const discussedFilterButtonElement =filterFormElement.querySelector('#filter-discussed');

  if (defaulFilterButtonElment.classList.contains('img-filters__button--active')) {
    return photos;
  }

  if (randomFilterButtoElement.classList.contains('img-filters__button--active')) {
    const slicedPhotos = photos.slice(0, RANDOM_PHOTOS_AMOUNT);
    const randomPhotos = shuffleArray(slicedPhotos);
    return randomPhotos;
  }

  if (discussedFilterButtonElement.classList.contains('img-filters__button--active')) {

    const sortedPhotos = photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length
    );

    return sortedPhotos;
  }
};

const addChangeFilterEventListener = (photos) => {
  filterContainerElement.addEventListener('click', debounce((evt) => {
    evt.preventDefault();

    if (evt.target.matches('.img-filters__button')) {
      const filteredPhotos = filterPhotos(photos);

      const picturesContainerElement = document.querySelector('.pictures');
      const picturesElements = document.querySelectorAll('.picture');
      picturesElements.forEach((element) => {
        picturesContainerElement.removeChild(element);
      });

      createPhotos(filteredPhotos);
      openBigPicture(filteredPhotos);
    }
  }));
  createPhotos(photos);
  openBigPicture(photos);
};

export {addFilterToggleEventListener, addChangeFilterEventListener};
