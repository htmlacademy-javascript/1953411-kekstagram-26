const form = document.querySelector('.img-upload__form');
const hashtagFielf = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const pristine = new Pristine(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    console.log('Форма валидна');
  } else {
    console.log('Форма не валидна');
  }
});

