import './util';
import './data';
import { createElement } from './data';

const CREATE_ELEMENT_LENGTH = 25;
Array.from({ length: CREATE_ELEMENT_LENGTH }, createElement);

