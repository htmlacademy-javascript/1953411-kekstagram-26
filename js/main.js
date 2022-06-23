function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength(100, 140);

function createRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

const OBJECTS_AMOUNT = 25;
const COMMENTS_MAX_ID = 150;
const COMMENTS_MIN_AMOUNT = 0;
const COMMENTS_MAX_AMOUNT = 4;
const LIKES_MIN_AMOUNT = 15;
const LIKES_MAX_AMOUNT = 200;
const AVATAR_MIN_INDEX = 1;
const AVATAR_MAX_INDEX = 6;

const NAMES = [
  'Алена',
  'Алина',
  'Анна',
  'Богдан',
  'Брюс',
  'Вай',
  'Владимир',
  'Гавриил',
  'Геннадий',
  'Завала',
  'Илья',
  'Иннокентий',
  'Кассандра',
  'Лоренцо',
  'Михаил',
  'Осирис',
  'Палпатин',
  'Роза',
  'Роман',
  'Сергей',
  'Скубби',
  'Смитт',
  'Снежанна',
  'Френсис',
  'Эйвор',
  'Эцио',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTIONS = [
  '',
  'Прибрежная зона, усаженная деревьями.',
  'Указатель в направлении пляжа.',
  'Залив на дивном острове.',
  'Мой отдых на море!',
  'Удивительнавя еда!!!!',
  'Зацените мою новую тачку!',
  'Легкий фруктовый завтрак.',
  'Дивные напитки из бабушкиного побреба ;)',
  'Самолет прямо над головой.',
  'Новенькая удобная подставка для убови.',
  'Тропинка в новую жизнь.',
  'Случайно заехаел не в тот район, упс :(',
  'ТАКОГО Я ЕЩЕ НЕ ПРОБОВАЛ!',
  'Готовимся к Хэллоуину с моим любимчиком!',
  'К полету в космос готов! Но сперва надо отоспаться...',
  'Земля в элюминоторе, Земля в элюминаторе виднаааа...',
  'В зале фоткать нельзя, но я смог!',
  'Готовимся к новому фотосету в заброшках.',
  'Когда ну очень боишься темноты.',
  'Привет тропики, вот и я!',
  'Это что-то непонятное, но наверняка вкусное.',
  'Закат на море прекрасен. Особенно, когда не нужно работать, хех )',
  'Смотрите, какого милаху встретила на пляже!',
  'Да начнется ФайерШОУ!!!!!!',
  'За секунду до...',
];

const NUMBERS_ARRAY = [];
let changedNumbers = [];

function createNumbersArray (numbersAmount) {
  for (let i = 0; i < numbersAmount; i ++ ) {
    NUMBERS_ARRAY[i] = i +1;
  }

  return NUMBERS_ARRAY;
}

function createUniqueNumbersArray (numbersAmount) {
  createNumbersArray(numbersAmount);

  let i = numbersAmount;
  let j = 0;
  let swap;

  while (i--) {
    j = getRandomPositiveInteger(0, i);
    swap = NUMBERS_ARRAY[i];
    NUMBERS_ARRAY[i] = NUMBERS_ARRAY[j];
    NUMBERS_ARRAY[j] = swap;
  }

  return NUMBERS_ARRAY;
}

function cloneArray (arrayLength) {
  changedNumbers = NUMBERS_ARRAY.slice(0, arrayLength);
  return changedNumbers;
}

function createComment () {
  return {
    id: null,
    avatar: '',
    message: createRandomArrayElement(MESSAGES),
    name: createRandomArrayElement(NAMES),
  };
}

function createDifferentComments ()  {
  const DIFFERENT_COMMNETS = Array.from({length: getRandomPositiveInteger(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT)}, createComment);
  createUniqueNumbersArray(COMMENTS_MAX_ID);
  cloneArray(COMMENTS_MAX_ID);

  for (let i = 0; i < DIFFERENT_COMMNETS.length; i++) {
    DIFFERENT_COMMNETS[i].id = changedNumbers[i];
    DIFFERENT_COMMNETS[i].avatar = `img/avatar-${getRandomPositiveInteger(AVATAR_MIN_INDEX, AVATAR_MAX_INDEX)}.svg`;
  }

  return DIFFERENT_COMMNETS;
}

function createPhotoCard () {
  return {
    id: null,
    url: '',
    description: '',
    likes: getRandomPositiveInteger(LIKES_MIN_AMOUNT, LIKES_MAX_AMOUNT),
    comment: '',
  };
}

function createSimilarPhotoCards (photoNumbersAmount)  {
  const SIMILAR_PHOTO_CARDS = Array.from({length: OBJECTS_AMOUNT}, createPhotoCard);
  const SIMILAR_COMMENTS = Array.from({length: OBJECTS_AMOUNT}, createDifferentComments);

  createUniqueNumbersArray(photoNumbersAmount);
  cloneArray(photoNumbersAmount);

  for (let i = 0; i < photoNumbersAmount; i++) {
    SIMILAR_PHOTO_CARDS[i].id = changedNumbers[i];
    SIMILAR_PHOTO_CARDS[i].url = `photos/${changedNumbers[i]}.jpg`;
    SIMILAR_PHOTO_CARDS[i].description = PHOTO_DESCRIPTIONS[changedNumbers[i]];
    SIMILAR_PHOTO_CARDS[i].comment = SIMILAR_COMMENTS[i];
  }

  return SIMILAR_PHOTO_CARDS;
}

createSimilarPhotoCards(OBJECTS_AMOUNT);
