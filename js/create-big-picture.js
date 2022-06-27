import {createSimilarPhotos} from './picture.js';

const photos = createSimilarPhotos();
const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onBigPictureEscapeKyedown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const createNewElement = (tagName, className, textContent) => {
  const newTag = document.createElement(tagName);
  newTag.classList.add(className);

  if (textContent) {
    newTag.textContent = textContent;
  }

  return newTag;
};

const createDomComment = (element) => {
  const newComment = createNewElement('li', 'social__comment');

  const image = createNewElement('img', 'social__picture');
  image.src = element.avatar;
  image.alt = element.name;
  image.width = '35';
  image.height = '35';
  newComment.appendChild(image);

  const paragraph = createNewElement('p', 'social__text');
  paragraph.textContent = element.message;
  newComment.appendChild(paragraph);

  return newComment;
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscapeKyedown);
}

for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture();

    const socialComments = bigPicture.querySelector('.social__comments');

    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    for (let j = 0; j < photos[i].comment.length; j++) {
      const newDomComment =  createDomComment(photos[i].comment[j]);
      socialComments.appendChild(newDomComment);
    }

    const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
    const bigPictureImg = bigPicture.querySelector('.big-picture__img');

    bigPictureSocial.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureSocial.querySelector('.comments-loader').classList.add('hidden');

    bigPictureImg.querySelector('img').src = photos[i].url;
    bigPictureImg.querySelector('img').alt = photos[i].description;

    bigPictureSocial.querySelector('.likes-count').textContent = photos[i].likes;
    bigPictureSocial.querySelector('.social__caption').textContent = photos[i].description;
    bigPictureSocial.querySelector('.comments-count').textContent = photos[i].comment.length;
  });
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscapeKyedown);
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});


