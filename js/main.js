import { getPictures } from './data';
import { renderPictures } from './thumbnail.js';

const pictures = getPictures();
renderPictures(pictures);
