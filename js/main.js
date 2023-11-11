import { getPictures } from './data';
import { renderPictures } from './thumbnail.js';
import { initPictureListeners } from './big-picture.js';

const pictures = getPictures();
renderPictures(pictures);
initPictureListeners(pictures);
