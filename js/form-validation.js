const form = document.querySelector('.img-upload__form');
const hashtagFielf = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

function validateHashtag () {
  return re.test(hashtagFielf.value);
}
function validateTextfield () {
  return descriptionField.value.length < 140;
}

pristine.addValidator(hashtagFielf, validateHashtag, 'Должно начинаться с # и содержать менее 20 символов!');
pristine.addValidator(descriptionField, validateTextfield, 'Должно содержать менее 140 символов!');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

