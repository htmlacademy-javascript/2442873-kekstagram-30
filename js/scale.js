const SCALE_DEFAULT = 100;
const SCALE_MIN = 25;
const SCALE_STEP_COUNT = 25;
const SCALE_MAX = 100;

const pictureFormElement = document.querySelector('.img-upload__form');
const scaleControlSmallerElement = pictureFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = pictureFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = pictureFormElement.querySelector('.scale__control--value');
const imagePreviewElement = pictureFormElement.querySelector('.img-upload__preview img');


const scalePicture = (value) => {
  scaleControlValueElement.value = `${value}%`;
  imagePreviewElement.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const value = Math.max(parseInt(scaleControlValueElement.value, 10) - SCALE_STEP_COUNT, SCALE_MIN);
  scalePicture(value);
};

const onBiggerButtonClick = () => {
  const value = Math.min(parseInt(scaleControlValueElement.value, 10) + SCALE_STEP_COUNT, SCALE_MAX);
  scalePicture(value);
};
const initScaleControlListener = () => {
  scaleControlSmallerElement.addEventListener('click', onSmallerButtonClick);
  scaleControlBiggerElement.addEventListener('click', onBiggerButtonClick);
};

const resetScale = () => scalePicture(SCALE_DEFAULT);

export { initScaleControlListener, resetScale };

