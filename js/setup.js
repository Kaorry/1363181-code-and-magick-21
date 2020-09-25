'use strict';

const WISARDS_COUNT = 4;
const WIZARD_NAMES = [`Иван `, `Хуан Себастьян `, `Мария `, `Кристоф `, `Виктор `, `Юлия `, `Люпита `, `Вашингтон `];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const prepareWizards = () => {
  const wizards = [];
  for (let i = 0; i < WISARDS_COUNT; i++) {
    wizards.push(generateRandomWizard());
  }

  return wizards;
};

const generateRandomWizard = () => (
  {
    name: WIZARD_NAMES[getRandomNumber(0, WIZARD_NAMES.length - 1)] + WIZARD_SURNAMES[getRandomNumber(0, WIZARD_SURNAMES.length - 1)],
    coatColor: COAT_COLORS[getRandomNumber(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLORS[getRandomNumber(0, EYES_COLORS.length - 1)]
  }
);

const renderWizard = (wizard, template) => {
  let wizardElement = template.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderWizardList = (wizards, template) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], template));
  }

  return fragment;
};

//

const setupPopup = document.querySelector(`.setup`);
setupPopup.classList.remove(`hidden`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

const wizards = prepareWizards();

similarListElement.appendChild(renderWizardList(wizards, similarWizardTemplate));

setupPopup.querySelector(`.setup-similar`).classList.remove(`hidden`);
