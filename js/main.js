import './util.js';
import {getData} from './network.js';
import {createPhotos} from './picture.js';
import {openBigPicture} from './create-big-picture.js';
import {addUploadPopupEventListener,closeDownloadImagePopup} from './open-close-download-image-popup.js';
import {addFieldValidation, addFormValidation} from'./form-validation.js';
import {setDefaultPhotoSize} from './scale-photo.js';
import {addSliderUpdater, initSlider} from './slider.js';

getData((photos) => {
  createPhotos(photos);
  openBigPicture(photos);
});

addUploadPopupEventListener();
addFieldValidation();
addFormValidation(closeDownloadImagePopup, closeDownloadImagePopup);

setDefaultPhotoSize();
initSlider();
addSliderUpdater();
