'use strict';

const WIZARDS_COUNT = 4;
const WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];
const WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];
const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];
const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const KEY_ESCAPE = `Escape`;
const KEY_ENTER = `Enter`;

const setupPopup = document.querySelector(`.setup`);
const setupPopupOpen = document.querySelector(`.setup-open`);
const userNameInput = document.querySelector(`.setup-user-name`);
const setupPopupClose = setupPopup.querySelector(`.setup-close`);

const mainWizardContainer = (() => {
  const main = document.querySelector(`.setup-player`);

  return {
    main,
    coat: main.querySelector(`.wizard-coat`),
    hiddenCoat: main.querySelector(`input[name="coat-color"]`),
    eyes: main.querySelector(`.wizard-eyes`),
    hiddenEyes: main.querySelector(`input[name="eyes-color"]`),
    fireball: main.querySelector(`.setup-fireball-wrap`),
    hiddenFireball: main.querySelector(`input[name="fireball-color"]`),
  };
})();

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

// Методы

const onPopupEscPress = (event) => {
  if (event.key === KEY_ESCAPE && !event.target.matches(`input[type="text"]`)) {
    event.preventDefault();
    closePopup();
  }
};

const onPopupEnterPress = (event) => {
  if (event.key === KEY_ENTER) {
    event.preventDefault();
    closePopup();
  }
};

const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const getRandomItem = (array) => array[getRandomNumber(0, array.length - 1)];

const generateArray = (length, generatorItem) => [...Array(length)]
  .map(generatorItem);

const generateWizardList = () => generateArray(
    WIZARDS_COUNT,
    generateRandomWizard
);

const generateRandomWizard = () => ({
  name: `${getRandomItem(WIZARD_NAMES)} ${getRandomItem(WIZARD_SURNAMES)}`,
  coatColor: getRandomItem(COAT_COLORS),
  eyesColor: getRandomItem(EYES_COLORS),
});

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizardList = (wizardList) => {
  const fragment = document.createDocumentFragment();

  for (const wizard of wizardList) {
    fragment.appendChild(renderWizard(wizard));
  }

  return fragment;
};

const openPopup = () => {
  setupPopup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  setupPopupClose.addEventListener(`keydown`, onPopupEnterPress);

  setupPopup.querySelector(`.setup-similar`).classList.remove(`hidden`);
};

const closePopup = () => {
  setupPopup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  document.removeEventListener(`keydown`, onPopupEnterPress);
};

// Логика

const wizardList = generateWizardList();

similarListElement.appendChild(renderWizardList(wizardList));

mainWizardContainer.coat.addEventListener(`click`, () => {
  const randomColor = getRandomItem(COAT_COLORS);
  mainWizardContainer.coat.style.fill = randomColor;
  mainWizardContainer.hiddenCoat.value = randomColor;
});

mainWizardContainer.eyes.addEventListener(`click`, () => {
  const randomColor = getRandomItem(EYES_COLORS);
  mainWizardContainer.eyes.style.fill = getRandomItem(EYES_COLORS);
  mainWizardContainer.hiddenEyes.value = randomColor;
});

mainWizardContainer.fireball.addEventListener(`click`, () => {
  const randomColor = getRandomItem(FIREBALL_COLORS);
  mainWizardContainer.fireball.style.background = getRandomItem(FIREBALL_COLORS);
  mainWizardContainer.hiddenFireball.value = randomColor;
});

setupPopupOpen.addEventListener(`click`, openPopup);

setupPopupOpen.addEventListener(`keydown`, (event) => {
  if (event.key === `Enter`) {
    openPopup();
  }
});

userNameInput.addEventListener(`invalid`, () => {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity(`Имя не должно превышать 25-ти символов`);
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity(`Обязательное поле`);
  } else {
    userNameInput.setCustomValidity(``);
  }
});
