import {createUniqueArray} from './util.js';
import {createPhotos} from './picture.js';
import {openBigPicture} from './create-big-picture.js';

const filterContainerElement = document.querySelector('.img-filters');
const filterFormElement = filterContainerElement.querySelector('.img-filters__form');
const picturesContainerElement = document.querySelector('.pictures');

function toggleActiveFilter (target) {
  const filterButtonElements = filterFormElement.querySelectorAll('.img-filters__button');

  filterButtonElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  target.classList.add('img-filters__button--active');
}

function addFilterToggleEventListener (photos) {
  filterContainerElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (evt.target.matches('.img-filters__button') && !evt.target.matches('.img-filters__button--active')) {
      toggleActiveFilter(evt.target);

      const picturesElements = document.querySelectorAll('.picture');
      picturesElements.forEach((element) => {
        picturesContainerElement.removeChild(element);
      });
      const filteredPhotos = filterPhotos(photos);
      createPhotos(filteredPhotos);
      openBigPicture(filteredPhotos);
      return filteredPhotos;
    }
  });

  createPhotos(filterPhotos(photos));
  openBigPicture(filterPhotos(photos));
  return filterPhotos(photos);
}

function filterPhotos (photos) {
  const defaulFilterButtonElment =filterFormElement.querySelector('#filter-default');
  const randomFilterButtoElement =filterFormElement.querySelector('#filter-random');
  const discussedFilterButtonElement =filterFormElement.querySelector('#filter-discussed');

  if (defaulFilterButtonElment.classList.contains('img-filters__button--active')) {
    return photos;
  }

  if (randomFilterButtoElement.classList.contains('img-filters__button--active')) {
    const slicedPhotos = photos.slice();
    const randomPhotos = createUniqueArray(slicedPhotos);
    return randomPhotos;
  }

  if (discussedFilterButtonElement.classList.contains('img-filters__button--active')) {

    const sortedPhotos = photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length
    );

    return sortedPhotos;
  }
}

export {addFilterToggleEventListener};
