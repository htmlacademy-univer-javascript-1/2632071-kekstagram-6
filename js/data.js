import { getRandomInt, getRandomItem } from './util.js';

const DESCRIPTIONS = ['Отличный кадр!', 'Прекрасный вид!', 'Незабываемый момент!', 'Как вам такое?', 'Это просто космос!'];
const NAMES = ['Артём', 'Мария', 'Алексей', 'Елена', 'Дмитрий', 'Ольга', 'Иван', 'Анна'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такого рода момент?!'
];

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
