import {addFormValidation, removeFormValidation} from './form-validation.js';
import {addChangingEffectEventListener, removeChangingEffectEventListener} from './slider.js';

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

  addChangingEffectEventListener();
  downloadImageCloseButtonElement.addEventListener('click', closeDownloadImagePopup);
  document.addEventListener('keydown', onPopupEscapeKeydown);
  removeUploadPopupEventListener();
  addFormValidation();
}

function closeDownloadImagePopup () {
  downloadImagePopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeChangingEffectEventListener();
  downloadImageCloseButtonElement.removeEventListener('click', closeDownloadImagePopup);
  document.removeEventListener('keydown', onPopupEscapeKeydown);
  addUploadPopupEventListener();
  removeFormValidation();

  imageUploadInputElement.value = '';
}

export {closeDownloadImagePopup, addUploadPopupEventListener};
