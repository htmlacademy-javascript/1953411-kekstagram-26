const downloadInput = document.querySelector('.img-upload__input');
const downloadImagePopup = document.querySelector('.img-upload__overlay');
const downloadImageCloseButton =  document.querySelector('.img-upload__cancel');


const onPopupEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeDownloadImagePopup();
  }
};

downloadInput.addEventListener('change', () => {
  openDownloadImagePopup();
});

function openDownloadImagePopup () {
  downloadImagePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  downloadImageCloseButton.addEventListener('click', closeDownloadImagePopup);
  document.addEventListener('keydown', onPopupEscapeKeydown);
}


function closeDownloadImagePopup () {
  downloadImagePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  downloadImageCloseButton.removeEventListener('click', closeDownloadImagePopup);
  document.removeEventListener('keydown', onPopupEscapeKeydown);

  downloadInput.value = '';
}
