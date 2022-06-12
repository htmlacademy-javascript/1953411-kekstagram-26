// Функция генерации случайных положительных чисел в заданном диапазоне включая крайние значения
// Функция взята из источника и доработана. Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/* Функция проверки длины комментария */

function checkStringLength (string, length) {
  return string.length <= length;
}

/* Выбор случайного элемента массива */

const createRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

/* Количество создаваемых объектов */

const OBJECTS_AMOUNT = 25;
const COMMENTS_MAX_ID = 150;
const COMMENTS_MIN_AMOUNT = 0;
const COMMENTS_MAX_AMOUNT = 4;

/* Наборы данных */

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

/* Создание упорядоченного массива */

const NUMBERS_ARRAY = [];
let CHANGED_NUMBERS_ARRAY = [];

function createNumbersArray (numbersAmont) {
  for (let i = 0; i < numbersAmont; i ++ ) {
    NUMBERS_ARRAY[i] = i +1;
  }

  return NUMBERS_ARRAY;
}

/* Создание неупорядоченного массива */

function getUniqueNumbersArray (numbersAmount) {

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

/* Создание нового массива на основе неупорядоченного */

function getNewArray (arrayLength) {
  CHANGED_NUMBERS_ARRAY = NUMBERS_ARRAY.slice(0, arrayLength);
}

/* Создание пустого комментария */

function createComment () {
  return {
    id: 0,
    avatar: 0,
    message: createRandomArrayElement(MESSAGES),
    name: createRandomArrayElement(NAMES),
  };
}

/* Создание массива пустых комментариев */

let differentComments = [];

function getDifferenComments () {
  differentComments = Array.from({length: getRandomPositiveInteger(COMMENTS_MIN_AMOUNT, COMMENTS_MAX_AMOUNT)}, createComment);
  return differentComments;
}

/* Заполение массива пустых комментариев сгенерированными данными */

function createDifferentComments ()  {
  getDifferenComments();
  getUniqueNumbersArray(COMMENTS_MAX_ID);
  getNewArray(COMMENTS_MAX_ID);

  for (let i = 0; i < differentComments.length; i++) {
    differentComments[i].id = CHANGED_NUMBERS_ARRAY[i];
    differentComments[i].avatar = `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`;
  }

  return differentComments;
}

/* Создание массива из массивов со случайным количеством сгенерированных комментариев для карточек фото в соответствии с количеством карточек фото */

const similarComments = Array.from({length: OBJECTS_AMOUNT}, createDifferentComments);

/* Создание пустой карточки фото */

function createPhotoCard () {
  return {
    id: 0,
    url: 0,
    description: 0,
    likes: getRandomPositiveInteger(15, 200),
    comment: 0,
  };
}

/* Создание массива из заданного количества пустых карточек фото */

const similarPhotoCards = Array.from({length: OBJECTS_AMOUNT}, createPhotoCard);

/* Заполнение массива пустых карточек фото сгенерированными данными */

function createSimilarPhotoCards (photoNumbersAmount)  {
  createDifferentComments();

  getUniqueNumbersArray(photoNumbersAmount);
  getNewArray(photoNumbersAmount);

  for (let i = 0; i < photoNumbersAmount; i++) {
    similarPhotoCards[i].id = CHANGED_NUMBERS_ARRAY[i];
    similarPhotoCards[i].url = `photos/${CHANGED_NUMBERS_ARRAY[i]}.jpg`;
    similarPhotoCards[i].description = PHOTO_DESCRIPTIONS[CHANGED_NUMBERS_ARRAY[i]];
    similarPhotoCards[i].comment = similarComments[i];
  }

  return similarPhotoCards;
}

// /* Вызовы функций */

checkStringLength(100, 140);

createSimilarPhotoCards(OBJECTS_AMOUNT);
