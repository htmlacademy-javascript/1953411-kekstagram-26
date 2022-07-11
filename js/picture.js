const createPhotos = (pictures) => {
  const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  const photosFragment = document.createDocumentFragment();

  let counter = 0;
  pictures.forEach(
    ({url, likes, comments}) => {
      const newPicture = pictureTemplateElement.cloneNode(true);

      newPicture.querySelector('.picture__img').src = url;
      newPicture.querySelector('.picture__likes').textContent = likes;
      newPicture.querySelector('.picture__comments').textContent = comments.length;
      photosFragment.appendChild(newPicture);

      newPicture.dataset.index = counter++;
    }
  );

  const picturesContainerElement = document.querySelector('.pictures');
  picturesContainerElement.appendChild(photosFragment);
};

export {createPhotos};
