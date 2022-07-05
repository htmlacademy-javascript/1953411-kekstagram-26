import './util.js';
import {createSimilarPhotoCards} from './data.js';

const generatedPhotos = createSimilarPhotoCards(25);

import {createPhotos, renderPhotos} from './picture.js';

const pictures = createPhotos(generatedPhotos);
renderPhotos(pictures);

import {openBigPicture} from './create-big-picture.js';

openBigPicture(generatedPhotos);

import {addUploadPopupEventListener} from './open-close-download-image-popup.js';

addUploadPopupEventListener();

import './form-validation.js';
