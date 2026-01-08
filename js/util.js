/* Функция для получения случайного числа в заданном диапазоне */
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
/* Функция для получения случайного элемента из массива */
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

/* Функция для устранения дребезга */
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomInteger, getRandomArrayElement, debounce };
