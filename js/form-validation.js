import {checkStringLength} from './util.js';
import {sendData} from './network.js';
import {showApprove, showError} from './messages.js';

const MAX_TEXT_LENGTH = 140;
const MAX_HASHTAG_AMOUNT = 5;

const formElement = document.querySelector('.img-upload__form');
const hashtagFielfElement = document.querySelector('.text__hashtags');
const descriptionFieldElement = document.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('#upload-submit');

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
  const hashtagValues = hashtagValue.split(' ');
  hashtagWords = hashtagValues.filter((word) =>  word !== '');

  for (let i = 0; i < hashtagWords.length; i++) {
    if (!re.test(hashtagWords[i])) {
      return false;
    }
  }
  return true;
}

function validateHashtagAmount () {
  return checkStringLength(hashtagWords, MAX_HASHTAG_AMOUNT);
}

function validateHashtagUniqueness () {
  for (let i = 0; i < hashtagWords.length; i++) {
    for (let j = i + 1; j < hashtagWords.length; j++) {
      if (hashtagWords[i].toUpperCase() === hashtagWords[j].toUpperCase()) {
        return false;
      }
    }
  }
  return true;
}

function validateTextfield () {
  return checkStringLength(descriptionFieldElement.value, MAX_TEXT_LENGTH);
}

function addFieldValidation () {
  pristine.addValidator(hashtagFielfElement, validateHashtag, 'Должно начинаться с # и содержать менее 20 символов!');
  pristine.addValidator(hashtagFielfElement, validateHashtagAmount, 'Можно только 5 хэштегов!');
  pristine.addValidator(hashtagFielfElement, validateHashtagUniqueness, 'Хэштеги должны быть разными!');
  pristine.addValidator(descriptionFieldElement, validateTextfield, 'Должно содержать менее 140 символов!');
}

function addBlockButton () {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'публикую...';
}

function removeBlockButton () {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'опубликовать';
}

function addFormValidation (onSuccess) {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      addBlockButton();

      sendData(
        () => {
          removeBlockButton();
          onSuccess();
          showApprove();
        },
        () => {
          removeBlockButton();
          showError();
        },
        new FormData(evt.target)
      );
    }
  });
}

export {addFormValidation, addFieldValidation};
