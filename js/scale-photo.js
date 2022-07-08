const VALUE_STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');
const controlValueElement = document.querySelector('.scale__control--value');
const imageBackgroundElement = document.querySelector('.img-upload__preview');
const imageElement = imageBackgroundElement.querySelector('img');

let value = MAX_VALUE;
controlValueElement.value = `${value}%`;

function increaseControlValue () {
  if (value < MAX_VALUE) {
    value += VALUE_STEP;
  }
  controlValueElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / 100})`;
}

function decreaseControlValue () {
  if (value > MIN_VALUE) {
    value -= VALUE_STEP;
  }
  controlValueElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / 100})`;
}

controlSmallerElement.addEventListener('click', decreaseControlValue);
controlBiggerElement.addEventListener('click', increaseControlValue);


