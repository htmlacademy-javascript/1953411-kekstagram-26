import {isEscPressed} from './util.js';
import {setDefaultPhotoSize, onResizeButtonClick,onCloseButtonClick} from './scale-photo.js';
import {onEffectChange, onPhotoClose, removeEffects} from './slider.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadInputElement = document.querySelector('.img-upload__input');
const downloadImagePopupElement = document.querySelector('.img-upload__overlay');
const downloadImageCloseButtonElement =  document.querySelector('.img-upload__cancel');
const imageElement = downloadImagePopupElement.querySelector('.img-upload__img');
const effectsPreviewElements = downloadImagePopupElement.querySelectorAll('.effects__preview');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');
const noEffectElement = document.querySelector('#effect-none');
const hashtagFielfElement = document.querySelector('.text__hashtags');

const onPopupEscapeKeydown = (evt) => {
  if (isEscPressed(evt)  && (hashtagFieldElement !== document.activeElement) && (descriptionFieldElement !== document.activeElement)) {
    evt.preventDefault();
    closeDownloadImagePopup();
  }

  if ((isEscPressed(evt)  && (hashtagFieldElement === document.activeElement)) || (isEscPressed(evt) && (descriptionFieldElement === document.activeElement))) {
    evt.target.blur();
  }
};

const openDownloadImagePopup = () => {
  const file = imageUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((name) =>  fileName.endsWith(name))) {
    imageElement.src = URL.createObjectURL(file);
    effectsPreviewElements.forEach((element)=> {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})` ;
    });
  }

  downloadImagePopupElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  setDefaultPhotoSize();

  downloadImageCloseButtonElement.addEventListener('click', closeDownloadImagePopup);
  document.addEventListener('keydown', onPopupEscapeKeydown);
  onImageClose();
  onResizeButtonClick();
  onEffectChange();
};

const onImageDownload = () => {
  imageUploadInputElement.addEventListener('change', openDownloadImagePopup);
};

function onImageClose () {
  imageUploadInputElement.removeEventListener('change', openDownloadImagePopup);
}

function closeDownloadImagePopup () {
  downloadImagePopupElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  downloadImageCloseButtonElement.removeEventListener('click', closeDownloadImagePopup);
  document.removeEventListener('keydown', onPopupEscapeKeydown);
  onImageDownload();
  setDefaultPhotoSize();
  onCloseButtonClick();
  onPhotoClose();

  noEffectElement.checked = true;
  removeEffects();
  imageUploadInputElement.value = '';
  hashtagFielfElement.value = '';
  descriptionFieldElement.value = '';
}

export {closeDownloadImagePopup, onImageDownload};
