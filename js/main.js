import './util.js';
import {createSimilarPhotoCards} from './data.js';

const generatedPhotos = createSimilarPhotoCards(25);

import {createSimilarPhotos, renderPhotos} from './picture.js';

const pictures = createSimilarPhotos(generatedPhotos);
renderPhotos(pictures);

// import './create-big-picture.js';
import {addUploadPopupEventListener} from './open-close-download-image-popup.js';

addUploadPopupEventListener();

import './form-validation.js';
