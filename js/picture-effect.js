const pictureFormElement = document.querySelector('.img-upload__form');
const sliderContainerElement = pictureFormElement.querySelector('.img-upload__effect-level');
const effectSliderElement = pictureFormElement.querySelector('.effect-level__slider');
const effectsElement = pictureFormElement.querySelector('.effects');
const effectValueElement = pictureFormElement.querySelector('.effect-level__value');
const imagePreviewElement = pictureFormElement.querySelector('.img-upload__preview img');
const originalEffectElement = pictureFormElement.querySelector('#effect-none');

const effectType = {
  original: 'none',
  chrome: 'chrome',
  sepia: 'sepia',
  marvin: 'marvin',
  phobos: 'phobos',
  heat: 'heat',
};

const filterStyle = {
  [effectType.chrome]: {
    style: 'grayscale',
    unit: ''
  },
  [effectType.sepia]: {
    style: 'sepia',
    unit: ''
  },
  [effectType.marvin]: {
    style: 'invert',
    unit: '%'
  },
  [effectType.phobos]: {
    style: 'blur',
    unit: 'px'
  },
  [effectType.heat]: {
    style: 'brightness',
    unit: ''
  }
};

const sliderOptions = {
  [effectType.original]: {
    min: 0,
    max: 100,
    step: 1
  },
  [effectType.chrome]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [effectType.sepia]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [effectType.marvin]: {
    min: 0,
    max: 100,
    step: 1
  },
  [effectType.phobos]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [effectType.heat]: {
    min: 1,
    max: 3,
    step: 0.1
  }
};

let currentEffect = effectType.original;

const isOriginal = () => currentEffect === effectType.original;

const setFilterStyle = () => {
  if (isOriginal()) {
    originalEffectElement.checked = true;
    imagePreviewElement.style.filter = null;
    return;
  }

  const effectValue = effectValueElement.value;
  const { style, unit } = filterStyle[currentEffect];
  imagePreviewElement.style.filter = `${style}(${effectValue}${unit})`;
};

const showEffectSlider = () => sliderContainerElement.classList.remove('hidden');

const hideEffectSlider = () => sliderContainerElement.classList.add('hidden');

const onSliderUpdate = () => {
  effectValueElement.value = effectSliderElement.noUiSlider.get();
  setFilterStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(effectSliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => +value,
      from: (value) => +value
    }
  });

  effectSliderElement.noUiSlider.on('update', onSliderUpdate);
  hideEffectSlider();
};

const updateSliderOption = ({ min, max, step }) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max
  });
};

const setSlider = () => {
  if (isOriginal()) {
    hideEffectSlider();
  } else {
    updateSliderOption(sliderOptions[currentEffect]);
    showEffectSlider();
  }
};

const setEffect = (effect) => {
  currentEffect = effect;
  setSlider();
  setFilterStyle();
};

const resetEffect = () => setEffect(effectType.original);

const onEffectsChange = (evt) => setEffect(evt.target.value);

const initEffectListener = () => {
  createSlider(sliderOptions[currentEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export { initEffectListener, resetEffect };
