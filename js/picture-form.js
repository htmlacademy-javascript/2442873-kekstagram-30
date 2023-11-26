
import { isEscapeKey } from './util.js';
import { resetScale, initScaleControlListener } from './scale.js';
import { resetEffect, initEffectListener } from './effect.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_LENGTH_COUNT = 5;
const COMMENT_LENGTH_COUNT = 140;

const SubmitButtonCaption = {
  SUBMITING: 'Отправляю...',
  IDLE: 'Отправить'
};

const bodyElement = document.querySelector('body');
const pictureFormElement = document.querySelector('.img-upload__form');
const pictureInputElement = pictureFormElement.querySelector('.img-upload__input');
const pictureOverlayElement = pictureFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = pictureFormElement.querySelector('#upload-cancel');
const hashtagInputElement = pictureFormElement.querySelector('.text__hashtags');
const commentTextAreaElement = pictureFormElement.querySelector('.text__description');
const submitButtonElement = pictureFormElement.querySelector('.img-upload__submit');
const errorElement = document.querySelector('.error');


const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonCaption.SUBMITING : SubmitButtonCaption.IDLE;
};

const openPictureForm = () => {
  pictureOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const pristine = new Pristine(pictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeTags = (tags) => tags.trim().split(' ').filter((tag) => Boolean(tag.length));

const isHashtagValid = (value) => normalizeTags(value).every((tag) => REG_EXP.test(tag));

const isHashtagUnique = (value) => {
  const lowerCaseHashtag = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseHashtag.length === new Set(lowerCaseHashtag).size;
};

const validateHashtagsLength = (value) => normalizeTags(value).length <= HASHTAG_LENGTH_COUNT;

const validateComment = (comment) => comment.trim().length <= COMMENT_LENGTH_COUNT;
const addValidators = () => {
  pristine.addValidator(
    hashtagInputElement,
    isHashtagValid,
    'Введён невалидный хэш-тег',
  );

  pristine.addValidator(
    hashtagInputElement,
    isHashtagUnique,
    'Хэш-теги повторяются'
  );

  pristine.addValidator(
    hashtagInputElement,
    validateHashtagsLength,
    'Нельзя указать больше пяти хэш-тегов'
  );

  pristine.addValidator(
    commentTextAreaElement,
    validateComment,
    'Длина комментария не может составлять больше 140 символов'
  );
};

const closePictureForm = () => {
  pictureInputElement.value = '';
  hashtagInputElement.value = '';
  commentTextAreaElement.value = '';
  pristine.reset();
  resetScale();
  resetEffect();
  pictureOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOpenPictureForm = () => {
  openPictureForm();
  addValidators();
  initEffectListener();
  initScaleControlListener();
};

const onClosePictureForm = () => {
  closePictureForm();
};

const submitForm = async (pictureData) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(pictureData));
    toggleSubmitButton(false);
    closePictureForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onSumbitPictureForm = (evt) => {
  evt.preventDefault();
  submitForm(evt.target);
};

const initPictureFormListener = () => {
  pictureInputElement.addEventListener('change', onOpenPictureForm);

  uploadCancelElement.addEventListener('click', onClosePictureForm);


  hashtagInputElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  commentTextAreaElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  pictureFormElement.addEventListener('submit', onSumbitPictureForm);
};

const isErrorMessageExist = () => Boolean(errorElement);

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isErrorMessageExist()) {
    evt.preventDefault();
    closePictureForm();
  }
}


export { initPictureFormListener };
