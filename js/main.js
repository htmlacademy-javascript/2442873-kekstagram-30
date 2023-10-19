//основные массивы
const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];

const NAMES = ['Вадим', 'Игорь', 'Никита', 'Екатерина', 'Анна', 'Виктор',];

const PHOTO_DESCRIPTIONS = ['Какой чудесный денек', 'Эх... были времена', 'Зачем я это выложил?', 'Другую фотку завтра выложу', 'Моя машина, как вам?', 'Купил холодильник'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//генерация ID

function generateId() {
  let id = 0;
  return function () {
    return id++;
  };
}


const generatePhotoId = generateId();
const generateCommentId = generateId();


//получаем случайное значение из объектов
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


// функция по возрату комментария, в виде объекта
const createComment = () => {
  const message = getRandomArrayElement(MESSAGES);
  const commentId = generateCommentId();
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message.trim(),
    name: getRandomArrayElement(NAMES),
  };
};


//функция по возрату фотографии, в виде объекта
const createElement = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `img/${getRandomInteger(1, 25)}.svg`,
    likes: getRandomInteger(15, 200),
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
  };
};


//создание 25-ти объектов
Array.from({ length: 25 }, createElement);

