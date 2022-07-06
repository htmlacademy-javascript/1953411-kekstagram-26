import {checkStringLength} from './util.js';
import {closeDownloadImagePopup} from './open-close-download-image-popup.js';

const MAX_TEXT_LENGTH = 139;
const MAX_HASHTAG_AMOUNT = 5;

const formElement = document.querySelector('.img-upload__form');
const hashtagFielfElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

let hashtagValue = hashtagFielfElement.value;
let hashtagWords = hashtagValue.split(' ');

function validateHashtag () {
  hashtagValue = hashtagFielfElement.value.trim();
  hashtagWords = hashtagValue.split(' ');
  let result = true;

  for (let i = 0; i < hashtagWords.length; i++) {
    if (!re.test(hashtagWords[i])) {
      result = false;
    }
  }
  return result;
}

function validateHashtagAmount () {
  return checkStringLength(hashtagWords, MAX_HASHTAG_AMOUNT);
}

function validateHashtagUniqueness () {
  let result = true;

  for (let i = 0; i < hashtagWords.length; i++) {
    for (let j = i + 1; j < hashtagWords.length; j++) {
      if (hashtagWords[i].toUpperCase() === hashtagWords[j].toUpperCase()) {
        result = false;
      }
    }
  }
  return result;
}

function validateTextfield () {
  return checkStringLength(descriptionFieldElement.value, MAX_TEXT_LENGTH);
}

pristine.addValidator(hashtagFielfElement, validateHashtag, 'Должно начинаться с # и содержать менее 20 символов!');
pristine.addValidator(hashtagFielfElement, validateHashtagAmount, 'Можно только 5 хэштегов!');
pristine.addValidator(hashtagFielfElement, validateHashtagUniqueness, 'Хэштеги должны быть разными!');
pristine.addValidator(descriptionFieldElement, validateTextfield, 'Должно содержать менее 140 символов!');

function validateForm (evt) {
  evt.preventDefault();
  pristine.validate();
}

function addFormValidation () {
  formElement.addEventListener('submit', validateForm);
  formElement.addEventListener('submit', closeDownloadImagePopup);
}

function removeFormValidation () {
  formElement.removeEventListener('submit', validateForm);
  formElement.removeEventListener('submit', closeDownloadImagePopup);
}

export {addFormValidation, removeFormValidation};
