const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

/* Пути запросов */
const route = {
  GET_DATA: '/data', // получить данные
  SEND_DATA: '/'     // отправить данные
};

/* Методы HTTP */
const method = {
  GET: 'GET',
  POST: 'POST'
};

/* Тексты ошибок для пользователя */
const errorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

/* Универсальная функция для запросов к серверу */
const load = async (routePath, errorMessage, methodType = method.GET, body = null) => {
  try {
    /* Отправляем запрос */
    const response = await fetch(`${BASE_URL}${routePath}`, {
      method: methodType,
      body
    });

    /* если сервер ответил с ошибкой */
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error){
    throw new Error(errorMessage);
  }
};

/* Получить данные с сервера */
const getData = () => load(route.GET_DATA, errorText.GET_DATA);

/* Отправить данные на сервер */
const sendData = (body) => load(route.SEND_DATA, errorText.SEND_DATA, method.POST, body);

export { getData, sendData };
