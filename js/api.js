const API_URL = 'https://30.javascript.pages.academy/kekstagram';
const ApiRoute = {
  GET_DATA: '/data',
  POST_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
  [Method.GET]: 'Не удалось загрузить данные',
  [Method.POST]: 'Ошибка загрузки файла'
};

const request = async (url, method = Method.GET, body = null) => {
  const response = await fetch(url, { method, body });

  if (!response.ok) {
    throw new Error(ErrorMessage[method]);
  }

  return response.json();
};

const loadPictures = async () => request(API_URL + ApiRoute.GET_DATA);

const sendPicture = async (payload) => request(API_URL + ApiRoute.POST_DATA, Method.POST, payload);

export { loadPictures, sendPicture };
