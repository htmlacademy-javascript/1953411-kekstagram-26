const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const checkStringLength = (string, length) => string.length <= length;

const createNewElement = (tagName, className, textContent) => {
  const newTag = document.createElement(tagName);
  newTag.classList.add(className);

  if (textContent) {
    newTag.textContent = textContent;
  }

  return newTag;
};

const isEscPressed = (evt) => evt.key === 'Escape';

const shuffleArray = (data) => {

  let i = data.length;
  let j = 0;

  while (i--) {
    j = getRandomPositiveInteger(0, i);
    [data[i], data[j]] = [data[j], data[i]];
  }

  return data;
};

const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {checkStringLength, getRandomPositiveInteger, createNewElement, shuffleArray, debounce, isEscPressed};
