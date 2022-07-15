const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const onBigPictureEscapeKyedown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicturePopup();
  }
};

const showBigPicturePopup = () => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscapeKyedown);
  closeButtonElement.addEventListener('click', hideBigPicturePopup);
};

function hideBigPicturePopup () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscapeKyedown);
  closeButtonElement.removeEventListener('click', hideBigPicturePopup);
}

export {showBigPicturePopup};
