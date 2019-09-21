'use strict';

var NUMBER_OF_SIMILAR_WIZARDS = 4;

var wizardSettings = document.querySelector('.setup');
wizardSettings.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURENAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

document.querySelector('.setup-similar').classList.remove('hidden');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var createWizard = function () {
  var wizard = {
    name: getRandomElem(WIZARD_NAMES) + ' ' + getRandomElem(WIZARD_SURENAMES),
    coatColor: getRandomElem(COAT_COLORS),
    eyesColor: getRandomElem(EYES_COLORS)
  };
  return wizard;
};

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = createWizard().name;
  wizardElement.querySelector('.wizard-coat').style.fill = createWizard().coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = createWizard().eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
  fragment.appendChild(renderWizard());
}

similarListElement.appendChild(fragment);

wizardSettings.querySelector('.setup-similar').classList.remove('hidden');
