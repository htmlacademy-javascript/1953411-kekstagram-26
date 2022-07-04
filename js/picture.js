const createPhotos = (pictures) => {
  const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  const photosFragment = document.createDocumentFragment();

  pictures.forEach(
    ({url, likes, comment}) => {
      const newPicture = pictureTemplateElement.cloneNode(true);

      newPicture.querySelector('.picture__img').src = url;
      newPicture.querySelector('.picture__likes').textContent = likes;
      newPicture.querySelector('.picture__comments').textContent = comment.length;
      photosFragment.appendChild(newPicture);
    }
  );
  return photosFragment;
};

function renderPhotos (pictures) {
  const picturesContainerElement = document.querySelector('.pictures');
  picturesContainerElement.appendChild(pictures);
}

export {createPhotos, renderPhotos};
