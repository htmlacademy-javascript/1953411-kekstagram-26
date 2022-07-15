import {createNewElement} from './util.js';
import {showBigPicturePopup} from './open-close-big-picture.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
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

const createDomCommentButton = () => {
  const newButton = createNewElement('button', 'social__comments-loader', 'Загрузить еще');

  newButton.type = 'button';
  newButton.classList.add('comments-loader');

  return newButton;
};

const replaceComment = (picture) => {

  commentsLoaderButtonElement = document.querySelector('.social__comments-loader');

  if (picture.comments.length < commentsAmount) {
    commentsAmount = picture.comments.length;
  }

  const commentsFragment = document.createDocumentFragment();

  socialCommentsElement.textContent = '';

  picture.comments.slice(0, commentsAmount).forEach( (comment) => {
    const newDomComment =  createDomComment(comment);
    commentsFragment.appendChild(newDomComment);
  });

  const commentsCountElement = document.querySelector('.social__comment-count');

  commentsCountElement.textContent = `${commentsAmount} из ${picture.comments.length} комментариев`;

  socialCommentsElement.appendChild(commentsFragment);
  if (commentsAmount === picture.comments.length) {
    commentsLoaderButtonElement.classList.add('hidden');
  } else {
    commentsLoaderButtonElement.classList.remove('hidden');
    commentsLoaderButtonElement.addEventListener('click',() => {
      replaceComment(picture);
    }, {once: true});
  }

  commentsAmount += SHOW_COMMENTS_AMOUNT;
};

const replaceBigPictureData = (picture) => {
  const bigPictureElement = document.querySelector('.big-picture');
  const bigPictureSocial = bigPictureElement.querySelector('.big-picture__social');
  const bigPictureImg = bigPictureElement.querySelector('.big-picture__img').querySelector('img');

  commentsAmount = SHOW_COMMENTS_AMOUNT;

  bigPictureSocial.removeChild(commentsLoaderButtonElement);

  socialCommentsElement.insertAdjacentElement('afterend', createDomCommentButton());

  replaceComment(picture);

  bigPictureImg.src = picture.url;

  bigPictureImg.alt = picture.description;

  bigPictureSocial.querySelector('.likes-count').textContent = picture.likes;

  bigPictureSocial.querySelector('.social__caption').textContent = picture.description;
};

const openBigPicture = (data) => {
  const pictureContainerElement = document.querySelector('.pictures');
  pictureContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('img')) {
      evt.preventDefault();
      showBigPicturePopup();

      const targetIndex = evt.target.parentElement.dataset.index;

      replaceBigPictureData(data[targetIndex]);
    }
  });
};

export {openBigPicture};
