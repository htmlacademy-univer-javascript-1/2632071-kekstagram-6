export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomItem = (array) => array[getRandomInt(0, array.length - 1)];
