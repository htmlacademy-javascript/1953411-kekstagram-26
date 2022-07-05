import {createNewElement} from './util.js';
import {showBigPicturePopup} from './open-close-big-picture.js';

const AVATAR_WIDTH = '35';
const AVATAR_HEIGHT = '35';

const createDomComment = (element) => {
  const newComment = createNewElement('li', 'social__comment');

  const image = createNewElement('img', 'social__picture');
  image.src = element.avatar;
  image.alt = element.name;
  image.width = AVATAR_WIDTH;
  image.height = AVATAR_HEIGHT;
  newComment.appendChild(image);

  const paragraph = createNewElement('p', 'social__text');
  paragraph.textContent = element.message;
  newComment.appendChild(paragraph);

  return newComment;
};

function replaceComment (elements, elementIndex) {
  const socialComments = document.querySelector('.big-picture').querySelector('.social__comments');

  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  for (let i = 0; i < elements[elementIndex].comment.length; i++) {
    const newDomComment =  createDomComment(elements[elementIndex].comment[i]);
    socialComments.appendChild(newDomComment);
  }
}

function openBigPicture (array) {
  const pictureContainerElement = document.querySelector('.pictures');
  pictureContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('img')) {
      evt.preventDefault();
      showBigPicturePopup();

      const pictureFragmentElements =[ ...document.querySelectorAll('.picture') ];

      const targetIndex = pictureFragmentElements.indexOf(evt.target.parentElement);

      replaceBigPictureData(array, targetIndex);
    }
  });
}

function replaceBigPictureData (pictures, index) {
  replaceComment(pictures, index);

  const bigPictureElement = document.querySelector('.big-picture');

  const bigPictureSocial = bigPictureElement.querySelector('.big-picture__social');
  const bigPictureImg = bigPictureElement.querySelector('.big-picture__img');

  bigPictureImg.querySelector('img').src = pictures[index].url;

  bigPictureImg.querySelector('img').alt = pictures[index].description;

  bigPictureSocial.querySelector('.likes-count').textContent = pictures[index].likes;

  bigPictureSocial.querySelector('.social__caption').textContent = pictures[index].description;

  bigPictureSocial.querySelector('.comments-count').textContent = pictures[index].comment.length;
}

export {openBigPicture};
