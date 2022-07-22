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

const validateHashtag = () => {
  hashtagValue = hashtagFielfElement.value.trim();
  const hashtagValues = hashtagValue.split(' ');
  hashtagWords = hashtagValues.filter((word) =>  word !== '');

  for (let i = 0; i < hashtagWords.length; i++) {
    if (!re.test(hashtagWords[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagAmount = () =>  checkStringLength(hashtagWords, MAX_HASHTAG_AMOUNT);

const validateHashtagUniqueness = () => {
  for (let i = 0; i < hashtagWords.length; i++) {
    for (let j = i + 1; j < hashtagWords.length; j++) {
      if (hashtagWords[i].toUpperCase() === hashtagWords[j].toUpperCase()) {
        return false;
      }
    }
  }
  return true;
};

const validateTextfield = () => checkStringLength(descriptionFieldElement.value, MAX_TEXT_LENGTH);

const addFieldValidation = () => {
  pristine.addValidator(hashtagFielfElement, validateHashtag, 'Должно начинаться с # и содержать менее 20 символов!');
  pristine.addValidator(hashtagFielfElement, validateHashtagAmount, 'Можно только 5 хэштегов!');
  pristine.addValidator(hashtagFielfElement, validateHashtagUniqueness, 'Хэштеги должны быть разными!');
  pristine.addValidator(descriptionFieldElement, validateTextfield, 'Должно содержать менее 140 символов!');
};

const addBlockButton = () => {
  submitButtonElement.setAttribute('disabled', 'disabled');
  submitButtonElement.textContent = 'публикую...';
};

const removeBlockButton = () => {
  submitButtonElement.removeAttribute('disabled');
  submitButtonElement.textContent = 'опубликовать';
};

const addFormValidation = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
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
};

export {addFormValidation, addFieldValidation};
