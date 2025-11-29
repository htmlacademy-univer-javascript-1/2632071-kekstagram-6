import { getRandomInt, getRandomItem } from './util.js';
import { NAMES, MESSAGES, DESCRIPTIONS } from './data.js';

// Создание случайного сообщения
function generateMessage() {
  const messageCount = getRandomInt(1, 2);
  const messages = [];
  for (let i = 0; i < messageCount; i++) {
    const randomMessage = getRandomItem(MESSAGES);
    messages.push(randomMessage);
  }
  return messages.join(' ');
}

// Функция для создания уникальных ID (для комментариев)
function createId() {
  const usedIds = new Set();
  return function generateNewId() {
    let newId = getRandomInt(1, 1000);
    while (usedIds.has(newId)) {
      newId = getRandomInt(1, 1000);
    }
    usedIds.add(newId);
    return newId;
  };
}

const generateCommentId = createId();

// Функция для создания комментария
function createComment() {
  const comment = {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: generateMessage(),
    name: getRandomItem(NAMES)
  };
  return comment;
}

// Функция для создания одной фотографии
function createPhoto(photoId) {
  const commentCount = getRandomInt(0, 30);
  const comments = [];
  for (let i = 0; i < commentCount; i++) {
    const comment = createComment();
    comments.push(comment);
  }
  const photo = {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomItem(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: comments
  };
  return photo;
}

// Функция для создания всех фотографий
function generatePhotos() {
  const photos = [];
  const photoCount = 25;
  for (let i = 1; i <= photoCount; i++) {
    const photo = createPhoto(i);
    photos.push(photo);
  }
  return photos;
}

export { generatePhotos };
