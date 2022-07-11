import {setDefaultPhotoSize, addResizingButtonEventListener,removeResizingButtonEventListener} from './scale-photo.js';
import {addChangingEffectEventListener, removeChangingEffectEventListener, removeEffects} from './slider.js';

const imageUploadInputElement = document.querySelector('.img-upload__input');
const downloadImagePopupElement = document.querySelector('.img-upload__overlay');
const downloadImageCloseButtonElement =  document.querySelector('.img-upload__cancel');

const onPopupEscapeKeydown = (evt) => {
  const hashtagFieldElement = document.querySelector('.text__hashtags');
  const descriptionFieldElement = document.querySelector('.text__description');

  if (evt.key === 'Escape'  && hashtagFieldElement !== document.activeElement && descriptionFieldElement !== document.activeElement) {
    evt.preventDefault();
    closeDownloadImagePopup();
  }
};

function addUploadPopupEventListener () {
  imageUploadInputElement.addEventListener('change', openDownloadImagePopup);
}

function removeUploadPopupEventListener () {
  imageUploadInputElement.removeEventListener('change', openDownloadImagePopup);
}

function openDownloadImagePopup () {
  downloadImagePopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  downloadImageCloseButtonElement.addEventListener('click', closeDownloadImagePopup);
  document.addEventListener('keydown', onPopupEscapeKeydown);
  removeUploadPopupEventListener();
  addResizingButtonEventListener();
  addChangingEffectEventListener();
}

function closeDownloadImagePopup () {
  const noEffectElement = document.querySelector('#effect-none');
  const hashtagFielfElement = document.querySelector('.text__hashtags');
  const descriptionFieldElement = document.querySelector('.text__description');

  downloadImagePopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  downloadImageCloseButtonElement.removeEventListener('click', closeDownloadImagePopup);
  document.removeEventListener('keydown', onPopupEscapeKeydown);
  addUploadPopupEventListener();
  setDefaultPhotoSize();
  removeResizingButtonEventListener();
  removeChangingEffectEventListener();

  noEffectElement.checked = true;
  removeEffects();
  imageUploadInputElement.value = '';
  hashtagFielfElement.value = '';
  descriptionFieldElement.value = '';
}

export {closeDownloadImagePopup, addUploadPopupEventListener};
