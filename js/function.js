/*
// Функция проверки длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;
*/
/*
// Функция проверки палиндрома с учётом пробелов и регистра
const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = normalizedString.split('').reverse().join('');
  return normalizedString === reversedString;
};
*/
/*
// Проверка длины строки
console.log(checkStringLength('проверяемая строка', 20)); //  дожлно быть true
console.log(checkStringLength('проверяемая строка', 18)); //  дожлно быть true
console.log(checkStringLength('проверяемая строка', 10)); //  дожлно быть false

// Проверка палиндрома
console.log(isPalindrome('топот')); //  дожлно быть true
console.log(isPalindrome('ДовОд')); //  дожлно быть true
console.log(isPalindrome('Кекс')); //  дожлно быть false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // дожлно быть true

// Функция преобразования времени в кол-во минут
function isMeetingWithinWorkday(workStart, workEnd, meetingStart, duration) {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  return (
    meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes
  );
}
// Проверки работы кода
console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));     // true
console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900)); // false
*/

