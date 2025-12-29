import { userPhotos } from './main.js';

/* элементы полноэкранного просмотра */
const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

/* количество комментариев за раз */
const COMMENTS_PER_PAGE = 5;

/* создаёт DOM-элемент комментария */
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = comment.avatar;
  avatarImg.alt = comment.name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.appendChild(avatarImg);
  commentElement.appendChild(commentText);

  return commentElement;
};

/* открывает фото в полноэкранном режиме */
const renderFullscreenPhoto = (photoData) => {
  /* показываем счётчик и кнопку загрузки */
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  /* заполняем данные фото */
  bigImgElement.src = photoData.url;
  bigImgElement.alt = photoData.description;
  likesCountElement.textContent = photoData.likes;
  commentsCountElement.textContent = photoData.comments.length;
  socialCaptionElement.textContent = photoData.description;

  /* очищаем комментарии */
  socialCommentsElement.innerHTML = '';

  let shownComments = 0;

  /* рендер порции комментариев */
  const renderCommentsPage = () => {
    const commentsToShow = photoData.comments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);

    commentsToShow.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      socialCommentsElement.appendChild(commentElement);
    });

    shownComments += commentsToShow.length;

    /* обновляем счётчик */
    socialCommentCountElement.innerHTML = `${shownComments} из <span class="comments-count">${photoData.comments.length}</span> комментариев`;

    /* скрываем кнопку, если всё показали */
    if (shownComments >= photoData.comments.length) {
      commentsLoaderElement.classList.add('hidden');
    }
  };

  /* первый рендер комментариев */
  renderCommentsPage();

  /* обработчик кнопки "показать ещё" */
  const onCommentsLoaderClick = () => {
    renderCommentsPage();
  };

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  /* сохраняем обработчик для удаления */
  bigPictureElement._commentsLoaderHandler = onCommentsLoaderClick;

  /* показываем модалку */
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

/* закрывает полноэкранное фото */
const closeFullscreenPhoto = () => {
  /* удаляем обработчик загрузки комментариев */
  if (bigPictureElement._commentsLoaderHandler) {
    commentsLoaderElement.removeEventListener('click', bigPictureElement._commentsLoaderHandler);
    delete bigPictureElement._commentsLoaderHandler;
  }

  /* скрываем модалку */
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

/* обработка клика по превью */
const onThumbnailClick = (photoData) => {
  renderFullscreenPhoto(photoData);
};

/* инициализация полноэкранного просмотра */
const initFullscreenView = () => {
  const picturesContainer = document.querySelector('.pictures');

  /* клик по миниатюре */
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (thumbnail) {
      evt.preventDefault();

      /* находим данные фото */
      const currentId = parseInt(thumbnail.dataset.id, 10);
      const currentData = userPhotos.find((item) => item.id === currentId);

      if (currentData) {
        onThumbnailClick(currentData);
      }
    }
  });

  /* закрытие по кнопке */
  closeButtonElement.addEventListener('click', () => {
    closeFullscreenPhoto();
  });

  /* закрытие по Esc */
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeFullscreenPhoto();
    }
  });
};

export { initFullscreenView };
