const donloadInput = document.querySelector('.img-upload__input');
const downloadImagePopup = document.querySelector('.img-upload__overlay');
const downloadImageCloseButton =  document.querySelector('.img-upload__cancel');

donloadInput.addEventListener('change', () => {
  downloadImagePopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  downloadImageCloseButton.addEventListener('click', closeDownloadImagePopup);
});


function closeDownloadImagePopup () {
  downloadImagePopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

