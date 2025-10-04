// Функция проверки длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Функция проверки палиндрома с учётом пробелов и регистра
const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = normalizedString.split('').reverse().join('');
  return normalizedString === reversedString;
};

// Проверка длины строки
console.log(checkStringLength('проверяемая строка', 20)); //  дожлно быть true
console.log(checkStringLength('проверяемая строка', 18)); //  дожлно быть true
console.log(checkStringLength('проверяемая строка', 10)); //  дожлно быть false

// Проверка палиндрома
console.log(isPalindrome('топот')); //  дожлно быть true
console.log(isPalindrome('ДовОд')); //  дожлно быть true
console.log(isPalindrome('Кекс')); //  дожлно быть false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // дожлно быть true
