const pictureFormElement = document.querySelector('.img-upload__form');
const sliderContainerElement = pictureFormElement.querySelector('.img-upload__effect-level');
const effectSliderElement = pictureFormElement.querySelector('.effect-level__slider');
const effectsElement = pictureFormElement.querySelector('.effects');
const effectValueElement = pictureFormElement.querySelector('.effect-level__value');
const imagePreviewElement = pictureFormElement.querySelector('.img-upload__preview img');
const originalEffectElement = pictureFormElement.querySelector('#effect-none');

const EffectType = {
  ORIGINAL: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const FilterStyle = {
  [EffectType.CHROME]: {
    style: 'grayscale',
    unit: ''
  },
  [EffectType.SEPIA]: {
    style: 'sepia',
    unit: ''
  },
  [EffectType.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [EffectType.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [EffectType.HEAT]: {
    style: 'brightness',
    unit: ''
  }
};

const sliderOptions = {
  [EffectType.ORIGINAL]: {
    min: 0,
    max: 100,
    step: 1
  },
  [EffectType.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [EffectType.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [EffectType.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [EffectType.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [EffectType.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  }
};

let currentEffect = EffectType.ORIGINAL;

const isOriginal = () => currentEffect === EffectType.ORIGINAL;

const setFilterStyle = () => {
  if (isOriginal()) {
    originalEffectElement.checked = true;
    imagePreviewElement.style.filter = null;
    return;
  }

  const effectValue = effectValueElement.value;
  const { style, unit } = FilterStyle[currentEffect];
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

const resetEffect = () => setEffect(EffectType.ORIGINAL);

const onEffectsChange = (evt) => setEffect(evt.target.value);

createSlider(sliderOptions[currentEffect]);

const initEffectListener = () => {
  effectsElement.addEventListener('change', onEffectsChange);
};

export { initEffectListener, resetEffect };
