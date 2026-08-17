document.documentElement.classList.replace('no-js', 'js');

/* MAP */
const mapFrame = document.querySelector('.contacts__map-interactive');

/* NAVIGATION */
const navigation = document.querySelector('.navigation');
const button = navigation.querySelector('.navigation__button');

/* SLIDER */
const sliders = document.querySelectorAll('.slider');

/* MAP */
mapFrame.addEventListener('load', () => {
  mapFrame.classList.add('contacts__map-interactive--loaded');
});

/* NAVIGATION */
const closeMenu = () => {
  navigation.classList.remove('navigation--opened');
  navigation.classList.add('navigation--closed');
  button.setAttribute('aria-expanded', 'false');
};

const openMenu = () => {
  navigation.classList.remove('navigation--closed');
  navigation.classList.add('navigation--opened');
  button.setAttribute('aria-expanded', 'true');
};

button.addEventListener('click', () => {
  const isOpened = navigation.classList.contains('navigation--opened');

  if (isOpened) {
    closeMenu();
  } else {
    openMenu();
  }
});

/* SLIDER */

sliders.forEach((slider) => {
  const images = slider.querySelector('.slider__images');
  const buttonSlider = slider.querySelector('.slider__button');

  let isDragging = false;

  const setPosition = (clientX) => {
    const rect = images.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    offsetX = Math.max(0, Math.min(offsetX, rect.width));

    const percent = (offsetX / rect.width) * 100;

    images.style.setProperty('--slider-position', `${percent}%`);
  };

  buttonSlider.addEventListener('pointerdown', (evt) => {
    isDragging = true;
    buttonSlider.setPointerCapture(evt.pointerId);
  });

  window.addEventListener('pointermove', (evt) => {
    if (!isDragging) {
      return;
    }
    setPosition(evt.clientX);
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });
});
