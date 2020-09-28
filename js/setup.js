'use strict';

const WIZARDS_COUNT = 4;
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

const setupPopup = document.querySelector(`.setup`);
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

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

const wizardList = generateWizardList();

similarListElement.appendChild(renderWizardList(wizardList));

setupPopup.classList.remove(`hidden`);
setupPopup.querySelector(`.setup-similar`).classList.remove(`hidden`);
