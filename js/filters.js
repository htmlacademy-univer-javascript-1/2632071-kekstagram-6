import { debounce } from './util.js';
import { renderThumbnails } from './rendering_thumbnails.js';

/* количество случайных фото */
const RANDOM_PHOTOS_COUNT = 10;

/* текущий фильтр */
let currentFilter = 'default';
/* все фото */
let originalPhotos = [];
/* отфильтрованные фото */
let filteredPhotos = [];

/* фильтр по умолчанию */
const filterDefault = () => [...originalPhotos];

/* фильтр случайных фото */
const filterRandom = () => {
  const photos = [...originalPhotos];
  const randomPhotos = [];

  /* выбираем случайные без повторений */
  for (let i = 0; i < Math.min(RANDOM_PHOTOS_COUNT, photos.length); i++) {
    const randomIndex = Math.floor(Math.random() * photos.length);
    randomPhotos.push(photos[randomIndex]);
    photos.splice(randomIndex, 1);
  }

  return randomPhotos;
};

/* фильтр по количеству комментариев */
const filterDiscussed = () => [...originalPhotos].sort((a, b) => b.comments.length - a.comments.length);

/* применяет текущий фильтр */
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

  /* контейнер для превью */
  const picturesContainer = document.querySelector('.pictures');
  renderThumbnails(filteredPhotos, picturesContainer);
};

/* debounce для переключения фильтров */
const debouncedApplyFilter = debounce(applyFilter);

/* инициализация фильтров */
const initFilters = (photos) => {
  /* сохраняем исходные фото */
  originalPhotos = [...photos];

  /* показываем блок фильтров */
  const filtersElement = document.querySelector('.img-filters');
  filtersElement.classList.remove('img-filters--inactive');

  /* кнопки фильтров */
  const filterButtons = document.querySelectorAll('.img-filters__button');

  /* обработчик клика */
  const onFilterButtonClick = (evt) => {
    /* убираем активный класс */
    filterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    /* добавляем активный класс */
    evt.target.classList.add('img-filters__button--active');

    /* меняем текущий фильтр */
    currentFilter = evt.target.id.replace('filter-', '');

    /* применяем фильтр */
    debouncedApplyFilter();
  };

  /* вешаем обработчики */
  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterButtonClick);
  });

  /* первый рендер */
  applyFilter();
};

export { initFilters };
