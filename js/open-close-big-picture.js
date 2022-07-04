const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

bigPictureElement.querySelector('.big-picture__social').querySelector('.social__comment-count').classList.add('hidden');

bigPictureElement.querySelector('.big-picture__social').querySelector('.comments-loader').classList.add('hidden');

const onBigPictureEscapeKyedown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscapeKyedown);
  closeButtonElement.addEventListener('click', closeBigPicture);
}

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscapeKyedown);
  closeButtonElement.removeEventListener('click', closeBigPicture);
}

export {openBigPicture, closeBigPicture};
