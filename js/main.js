/* Функция получения случайного целого числа включая границы  */
/* За основу взято - https://schoolsw3.com/js/js_random.php и доработано */
function getRandomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0) {
    return 'Ошибка! Диапазон должен быть положительным (включает 0)';
  }
  return (min <= max ? Math.floor(Math.random() * (max - min + 1)) + min : 'Данные не корректны. Первое число должно быть меньше второго, а промежуток должен включать хотя бы одно целое цисло');
}

getRandomNumber(2, 6);

/* Функция проверки длины комментария */

function checkCommentLength (commentLength, maxCommentLength) {
  if (commentLength > maxCommentLength) {
    return false;
  }

  return true;
}

checkCommentLength(100, 140);
