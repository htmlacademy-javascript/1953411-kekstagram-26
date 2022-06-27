import {createSimilarPhotoCards} from './data.js';

const PICTURES_AMOUNT = 25;

const similarPhotos = createSimilarPhotoCards(PICTURES_AMOUNT);
const similarPhotoFragment = document.createDocumentFragment();

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createSimilarPhotos = () => {
  similarPhotos.forEach(
    ({url, likes, comment}) => {
      const newPicture = pictureTemplate.cloneNode(true);
      newPicture.querySelector('.picture__img').src = url;
      newPicture.querySelector('.picture__likes').textContent = likes;
      newPicture.querySelector('.picture__comments').textContent = comment.length;
      similarPhotoFragment.appendChild(newPicture);
    }
  );
  return similarPhotos;
};

createSimilarPhotos();

picturesContainer.appendChild(similarPhotoFragment);

export {createSimilarPhotos};

