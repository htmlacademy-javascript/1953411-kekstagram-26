function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

const createNewElement = (tagName, className, textContent) => {
  const newTag = document.createElement(tagName);
  newTag.classList.add(className);

  if (textContent) {
    newTag.textContent = textContent;
  }

  return newTag;
};

function shuffleArray (data) {

  let i = data.length;
  let j = 0;
  let swap;

  while (i--) {
    j = getRandomPositiveInteger(0, i);
    swap = data[i];
    data[i] = data[j];
    data[j] = swap;
  }

  return data;
}

function debounce (callback, timeoutDelay = 500) {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {checkStringLength, getRandomPositiveInteger, createNewElement, shuffleArray, debounce};
