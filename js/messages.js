
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const newSuccessMessage = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const newErrorMessage = errorTemplate.cloneNode(true);

function onSuccessEscapeKyedown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccessPopup();
  }
}

function onErrorEscapeKyedown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorPopup();
  }
}

function closeSuccessPopup () {
  document.removeEventListener('keydown', onSuccessEscapeKyedown);
  document.body.removeChild(newSuccessMessage);
  document.removeEventListener('click', closeSuccessPopup);
}

function closeErrorPopup () {
  document.removeEventListener('keydown', onErrorEscapeKyedown);
  document.body.removeChild(newErrorMessage);
  document.removeEventListener('click', closeErrorPopup);
}

function showApprove () {
  document.body.appendChild(newSuccessMessage);

  const successButtonElement = document.querySelector('.success__button');

  document.addEventListener('keydown', onSuccessEscapeKyedown);

  successButtonElement.addEventListener('click', closeSuccessPopup);

  document.addEventListener('click', closeSuccessPopup);
}

function showError () {
  newErrorMessage.style.zIndex = '100';
  document.body.appendChild(newErrorMessage);

  const successButtonElement = document.querySelector('.error__button');

  document.addEventListener('keydown', onErrorEscapeKyedown);

  successButtonElement.addEventListener('click', closeErrorPopup);

  document.addEventListener('click', closeErrorPopup);
}

export {showApprove, showError};
