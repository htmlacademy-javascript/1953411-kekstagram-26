import './util.js';
import {getData} from './network.js';
import './picture.js';
import './create-big-picture.js';
import {onImageDownload,closeDownloadImagePopup} from './open-close-download-image-popup.js';
import {addFieldValidation, addFormValidation} from'./form-validation.js';
import {setDefaultPhotoSize} from './scale-photo.js';
import {addSliderUpdater, initSlider} from './slider.js';
import {onFilterClick, onFilterChange} from './filter.js';
import './messages.js';

getData( (photos) => {
  onFilterClick(photos);
  onFilterChange(photos);
});

const filterContainerElement = document.querySelector('.img-filters');
filterContainerElement.classList.remove('img-filters--inactive');

onImageDownload();
addFieldValidation();
addFormValidation(closeDownloadImagePopup, closeDownloadImagePopup);

setDefaultPhotoSize();
initSlider();
addSliderUpdater();
