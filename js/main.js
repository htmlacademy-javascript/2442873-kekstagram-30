import { loadPictures } from './api.js';
import { renderPictures } from './thumbnail.js';
import { initPictureListeners } from './big-picture.js';
import { initPictureFormListener } from './picture-form.js';
import { showLoadErrorMessage } from './messages.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
    initPictureListeners(pictures);
    initPictureFormListener();
  } catch {
    showLoadErrorMessage();
  }
};

bootstrap();
