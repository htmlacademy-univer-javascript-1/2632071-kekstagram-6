// Создание миниатюры
const createThumbnail = (pictureData) => {
  const pictureTemplate = document.querySelector('#picture');
  const thumbnailElement = pictureTemplate.content.querySelector('.picture').cloneNode(true);
  thumbnailElement.dataset.id = pictureData.id;

  // Действия над картинками
  const thumbImg = thumbnailElement.querySelector('.picture__img');
  thumbImg.src = pictureData.url;
  thumbImg.alt = pictureData.description;

  // Действия над комментариями
  const thumbComments = thumbnailElement.querySelector('.picture__comments');
  thumbComments.textContent = pictureData.comments.length;

  // ФИКС ВЫРАВНИВАНИЯ (chatgpt)
  thumbComments.style.display = 'inline-flex';
  thumbComments.style.alignItems = 'center';
  thumbComments.style.lineHeight = '1';
  thumbComments.style.position = 'relative';
  thumbComments.style.top = '0';

  // Действия над лайками
  const thumbLikes = thumbnailElement.querySelector('.picture__likes');
  thumbLikes.textContent = pictureData.likes;

  // ФИКС ВЫРАВНИВАНИЯ (chatgpt)
  thumbLikes.style.display = 'inline-flex';
  thumbLikes.style.alignItems = 'center';
  thumbLikes.style.lineHeight = '1';
  thumbLikes.style.position = 'relative';
  thumbLikes.style.top = '0';

  return thumbnailElement;
};

// Отрисовка миниатюр
const renderThumbnails = (picturesList, picturesContainer) => {
  const renderFragment = document.createDocumentFragment();

  picturesList.forEach((pictureItem) => {
    const thumbnail = createThumbnail(pictureItem);
    renderFragment.appendChild(thumbnail);
  });

  const oldThumbnails = picturesContainer.querySelectorAll('.picture');
  oldThumbnails.forEach((thumb) => thumb.remove());

  picturesContainer.appendChild(renderFragment);
};

export { renderThumbnails };
