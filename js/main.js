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


function generateId() {
  let id = 0;
  return function () {
    return id++;
  };
}


const generatePhotoId = generateId();
const generateCommentId = generateId();


const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const minRandomAvatarNumber = 1;
const maxRandomAvatarNumber = 6;

const createComment = () => {
  const message = getRandomArrayElement(MESSAGES);
  const commentId = generateCommentId();
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(minRandomAvatarNumber, maxRandomAvatarNumber)}.svg`,
    message: message.trim(),
    name: getRandomArrayElement(NAMES),
  };
};


const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;
const MIN_RANDOM_INTENGER_IMG = 1;
const MAX_RANDOM_INTENGER_IMG = 25;
const MIN_RANDOM_INTENGER_COMENT = 0;
const MAX_RANDOM_INTENGER_COMENT = 30;

const createElement = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `img/${getRandomInteger(MIN_RANDOM_INTENGER_IMG, MAX_RANDOM_INTENGER_IMG)}.svg`,
    likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    comments: Array.from({ length: getRandomInteger(MIN_RANDOM_INTENGER_COMENT, MAX_RANDOM_INTENGER_COMENT) }, createComment)
  };
};


const CREATE_ELEMENT_LENGTH = 25;
Array.from({ length: CREATE_ELEMENT_LENGTH }, createElement);

