export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getRandomItem = (array) => array[getRandomInt(0, array.length - 1)];

import { DESCRIPTIONS, NAMES, MESSAGES } from './data.js';

const createComment = () => ({
  id: getRandomInt(100, 9999),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: Array.from({length: getRandomInt(1, 2)}, () => getRandomItem(MESSAGES)).join(' '),
  name: getRandomItem(NAMES)
});

export const createPhotos = () => Array.from({length: 25}, (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: getRandomItem(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(0, 30)}, createComment)
}));
