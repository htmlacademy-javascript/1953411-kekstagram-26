import './util.js';
import {createSimilarPhotoCards} from './data.js';
import {createPhotos, renderPhotos} from './picture.js';
import {openBigPicture} from './create-big-picture.js';
import {addUploadPopupEventListener} from './open-close-download-image-popup.js';
import {addFieldValidation} from'./form-validation.js';
import './scale-photo.js';
import {addSliderUpdater} from './slider.js';

const PHOTOS_AMOUNT = 25;
const generatedPhotos = createSimilarPhotoCards(PHOTOS_AMOUNT);

const pictures = createPhotos(generatedPhotos);
renderPhotos(pictures);

openBigPicture(generatedPhotos);

addUploadPopupEventListener();
addFieldValidation();

addSliderUpdater();
