import { getData } from './api.js';
import { renderThumbnails } from './rendering_thumbnails.js';
import { initFullscreenView } from './fullscreen.js';
import { initUploadForm } from './form.js';
import { initFilters } from './filters.js';

/* время показа ошибки */
const ALERT_SHOW_TIME = 5000;

/* загруженные фото пользователя */
let userPhotos = [];

/* показывает сообщение об ошибке */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  /* стили алерта */
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  /* удаляем алерт через время */
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

/* загружает фото с сервера */
const loadPhotos = async () => {
  try {
    /* получаем данные */
    userPhotos = await getData();

    /* рендер превью */
    const picturesContainer = document.querySelector('.pictures');
    renderThumbnails(userPhotos, picturesContainer);

    /* инициализация модалок и фильтров */
    initFullscreenView();
    initFilters(userPhotos);
  } catch (error) {
    /* показываем ошибку */
    showAlert(error.message);
    userPhotos = [];
  }
};

/* старт приложения */
window.addEventListener('DOMContentLoaded', () => {
  loadPhotos();
  initUploadForm();
});

export { userPhotos };
