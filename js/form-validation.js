import {checkStringLength} from './util.js';
import {closeDownloadImagePopup} from './open-close-download-image-popup.js';

const MAX_TEXT_LENGTH = 139;
const MAX_HASHTAG_AMOUNT = 5;

const form = document.querySelector('.img-upload__form');
const hashtagFielf = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

let hashtagValue = hashtagFielf.value;
let hashtagWords = hashtagValue.split(' ');

function validateHashtag () {
  hashtagValue = hashtagFielf.value;
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
      if (hashtagWords[i] === hashtagWords[j]) {
        result = false;
      }
    }
  }
  return result;
}

function validateTextfield () {
  return checkStringLength(descriptionField.value, MAX_TEXT_LENGTH);
}

pristine.addValidator(hashtagFielf, validateHashtag, 'Должно начинаться с # и содержать менее 20 символов!');
pristine.addValidator(hashtagFielf, validateHashtagAmount, 'Можно только 5 хэштегов!');
pristine.addValidator(hashtagFielf, validateHashtagUniqueness, 'Хэштеги должны быть разными!');
pristine.addValidator(descriptionField, validateTextfield, 'Должно содержать менее 140 символов!');

function validateForm (evt) {
  evt.preventDefault();
  pristine.validate();
}

function addFormValidation () {
  form.addEventListener('submit', validateForm);
  form.addEventListener('submit', closeDownloadImagePopup);
}

function removeFormValidation () {
  form.removeEventListener('submit', validateForm);
  form.removeEventListener('submit', closeDownloadImagePopup);
}

export {addFormValidation, removeFormValidation};
