import {createNewElement} from './util.js';
import {showBigPicturePopup} from './open-close-big-picture.js';

const AVATAR_WIDTH = '35';
const AVATAR_HEIGHT = '35';
const SHOW_COMMENTS_AMOUNT = 5;
let commentsAmount = SHOW_COMMENTS_AMOUNT;

let commentsLoaderButtonElement = document.querySelector('.social__comments-loader');
const socialCommentsElement = document.querySelector('.big-picture').querySelector('.social__comments');

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

function createDomCommentButton () {
  const newButton = createNewElement('button', 'social__comments-loader', 'Загрузить еще');

  newButton.type = 'button';
  newButton.classList.add('comments-loader');

  return newButton;
}

function replaceComment (pictures, pictureIndex) {

  commentsLoaderButtonElement = document.querySelector('.social__comments-loader');

  function onLoadButtonClick () {
    replaceComment(pictures, pictureIndex);
  }

  if (pictures[pictureIndex].comment.length < commentsAmount) {
    commentsAmount = pictures[pictureIndex].comment.length;
  }

  const commentsFragment = document.createDocumentFragment();

  socialCommentsElement.textContent = '';

  pictures[pictureIndex].comment.slice(0, commentsAmount).forEach( (comment) => {
    const newDomComment =  createDomComment(comment);
    commentsFragment.appendChild(newDomComment);
  });

  const commentsCountElement = document.querySelector('.social__comment-count');

  commentsCountElement.textContent = `${commentsAmount} из ${pictures[pictureIndex].comment.length} комментариев`;

  socialCommentsElement.appendChild(commentsFragment);
  if (commentsAmount === pictures[pictureIndex].comment.length) {
    commentsLoaderButtonElement.classList.add('hidden');
  } else {
    commentsLoaderButtonElement.classList.remove('hidden');
    commentsLoaderButtonElement.addEventListener('click',onLoadButtonClick, {once: true});
  }

  commentsAmount+= SHOW_COMMENTS_AMOUNT;
}

function openBigPicture (array) {
  const pictureContainerElement = document.querySelector('.pictures');
  pictureContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('img')) {
      evt.preventDefault();
      showBigPicturePopup();

      const targetIndex = evt.target.parentElement.dataset.id;

      replaceBigPictureData(array, targetIndex);
    }
  });
}

function replaceBigPictureData (pictures, index) {
  const bigPictureElement = document.querySelector('.big-picture');
  const bigPictureSocial = bigPictureElement.querySelector('.big-picture__social');
  const bigPictureImg = bigPictureElement.querySelector('.big-picture__img').querySelector('img');

  commentsAmount = SHOW_COMMENTS_AMOUNT;

  bigPictureSocial.removeChild(commentsLoaderButtonElement);

  socialCommentsElement.insertAdjacentElement('afterend', createDomCommentButton());

  replaceComment(pictures, index);

  bigPictureImg.src = pictures[index].url;

  bigPictureImg.alt = pictures[index].description;

  bigPictureSocial.querySelector('.likes-count').textContent = pictures[index].likes;

  bigPictureSocial.querySelector('.social__caption').textContent = pictures[index].description;
}

export {openBigPicture};
