// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

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
const COMMENTS_AMOUNT = 100;

/* Генерация объекта */
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

/* Функция по генерации массива неповторяющихся значений */

const NUMBERS_ARRAY = [];
let CHANGED_NUMBERS_ARRAY = [];

/* Создание упорядоченного массива */

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

/* Объекты */

/* Комментарий */

function createComment () {
  return {
    id: 0,
    avatar: 0,
    message: createRandomArrayElement(MESSAGES),
    name: createRandomArrayElement(NAMES),
  };
}

/* Фото */

function createPhotoCard () {
  return {
    id: 0,
    url: 0,
    description: 0,
    likes: getRandomPositiveInteger(15, 200),
    comment: createComment(),
  };
}

/* Создание массива из 25 элементов */

const similarObjects = Array.from({length: OBJECTS_AMOUNT}, createPhotoCard);

/* Создание случайных комментариев */

function createDifferentComments (numbersAmount)  {

  getUniqueNumbersArray(numbersAmount);
  getNewArray(numbersAmount);

  for (let i = 0; i < OBJECTS_AMOUNT; i++) {
    similarObjects[i].comment.id = CHANGED_NUMBERS_ARRAY[i];
    similarObjects[i].comment.avatar = `img/avatar-${getRandomPositiveInteger(0,6)}.svg`;
  }
}

/* Создание случайных карточек */

function createDifferentObjects (commentNumbersAmount, photoNumbersAmount)  {
  createDifferentComments(commentNumbersAmount);

  getUniqueNumbersArray(photoNumbersAmount);
  getNewArray(photoNumbersAmount);

  for (let i = 0; i < photoNumbersAmount; i++) {
    similarObjects[i].id = CHANGED_NUMBERS_ARRAY[i];
    similarObjects[i].url = `photos/${CHANGED_NUMBERS_ARRAY[i]}.jpg`;
    similarObjects[i].description = PHOTO_DESCRIPTIONS[CHANGED_NUMBERS_ARRAY[i]];
  }

  return similarObjects;
}

console.log(similarObjects);

/* Вызовы функций */

checkStringLength(100, 140);

createDifferentObjects(COMMENTS_AMOUNT, OBJECTS_AMOUNT);
