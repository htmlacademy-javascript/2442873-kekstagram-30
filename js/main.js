import { getPictures } from './data';
import { renderPictures } from './thumbnail.js';
import { initPictureListeners } from './big-picture.js';
import { initPictureFormListener } from './picture-form.js';

const pictures = getPictures();
renderPictures(pictures);
initPictureListeners(pictures);
initPictureFormListener();
