import { debounce } from './util.js';
import { renderThumbnails } from './rendering_thumbnails.js';

/* Количество случайных фото */
const RANDOM_PHOTOS_COUNT = 10;

/* Текущий фильтр */
let currentFilter = 'default';
/* Все фото */
let originalPhotos = [];
/* Отфильтрованные фото */
let filteredPhotos = [];

/* Фильтр по умолчанию */
const filterDefault = () => [...originalPhotos];

/* Фильтр случайных фото */
const filterRandom = () => {
  const photos = [...originalPhotos];
  const randomPhotos = [];

  /* Выбираем случайные без повторений */
  for (let i = 0; i < Math.min(RANDOM_PHOTOS_COUNT, photos.length); i++) {
    const randomIndex = Math.floor(Math.random() * photos.length);
    randomPhotos.push(photos[randomIndex]);
    photos.splice(randomIndex, 1);
  }

  return randomPhotos;
};

/* Фильтр по количеству комментариев */
const filterDiscussed = () => [...originalPhotos].sort((a, b) => b.comments.length - a.comments.length);

/* Применяет текущий фильтр */
const applyFilter = () => {
  switch (currentFilter) {
    case 'default':
      filteredPhotos = filterDefault();
      break;
    case 'random':
      filteredPhotos = filterRandom();
      break;
    case 'discussed':
      filteredPhotos = filterDiscussed();
      break;
    default:
      filteredPhotos = filterDefault();
  }

  /* Контейнер для превью */
  const picturesContainer = document.querySelector('.pictures');
  renderThumbnails(filteredPhotos, picturesContainer);
};

/* debounce для переключения фильтров */
const debouncedApplyFilter = debounce(applyFilter);

/* Инициализация фильтров */
const initFilters = (photos) => {
  /* Сохраняем исходные фото */
  originalPhotos = [...photos];

  /* Показываем блок фильтров */
  const filtersElement = document.querySelector('.img-filters');
  filtersElement.classList.remove('img-filters--inactive');

  /* Кнопки фильтров */
  const filterButtons = document.querySelectorAll('.img-filters__button');

  /* Обработчик клика */
  const onFilterButtonClick = (evt) => {
    /* Убираем активный класс */
    filterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    /* Добавляем активный класс */
    evt.target.classList.add('img-filters__button--active');

    /* Меняем текущий фильтр */
    currentFilter = evt.target.id.replace('filter-', '');

    /* Применяем фильтр */
    debouncedApplyFilter();
  };

  /* Вешаем обработчики */
  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterButtonClick);
  });

  /* Первый рендер */
  applyFilter();
};

export { initFilters };
