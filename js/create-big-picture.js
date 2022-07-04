import {createNewElement} from './util.js';
import {openBigPicture} from './open-close-big-picture.js';

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

function createBigPicture (pictures, data) {
  pictures.forEach( (picture) => {
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture();

      const pictureFragmentElements =[ ...document.querySelectorAll('.picture') ];

      const targetIndex = pictureFragmentElements.indexOf(evt.target.parentElement);

      replaceComment(data, targetIndex);

      const bigPictureElement = document.querySelector('.big-picture');

      const bigPictureSocial = bigPictureElement.querySelector('.big-picture__social');
      const bigPictureImg = bigPictureElement.querySelector('.big-picture__img');

      bigPictureImg.querySelector('img').src = data[targetIndex].url;

      bigPictureImg.querySelector('img').alt = data[targetIndex].description;

      bigPictureSocial.querySelector('.likes-count').textContent = data[targetIndex].likes;

      bigPictureSocial.querySelector('.social__caption').textContent = data[targetIndex].description;

      bigPictureSocial.querySelector('.comments-count').textContent = data[targetIndex].comment.length;
    });
  });
}

export {createBigPicture};
