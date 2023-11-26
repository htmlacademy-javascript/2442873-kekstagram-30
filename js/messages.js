import { isEscapeKey } from './util.js';

const REMOVE_MESSAGE_TIMEOUT = 5000;

const bodyElement = document.querySelector('body');
const errorLoadPicturesElement = document.querySelector('#data-error').content.querySelector('.data-error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');


const showLoadErrorMessage = () => {
  const errorTextElement = errorLoadPicturesElement.cloneNode(true);
  bodyElement.append(errorTextElement);

  setTimeout(() => {
    errorTextElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const hideMessage = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
};

const onCloseMessageButton = () => {
  hideMessage();
};

const showMessage = (element, classButton) => {
  bodyElement.append(element);
  bodyElement.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(classButton).addEventListener('click', onCloseMessageButton);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick (evt) {
  if (evt.target.closest === '.success__inner' || evt.target.closest === '.error__inner') {
    return;
  }

  hideMessage();
}

export { showLoadErrorMessage, showSuccessMessage, showErrorMessage };
