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

export {checkStringLength, getRandomPositiveInteger, createNewElement};
