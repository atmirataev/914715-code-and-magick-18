'use strict';

var NUMBER_OF_SIMILAR_WIZARDS = 4;

var wizardSettings = document.querySelector('.setup');
wizardSettings.classList.remove('hidden');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURENAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
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
  var wizardElement = similarWizardTemplate.cloneNode(true);
  var wizard = {
    name: getRandomElem(NAMES) + ' ' + getRandomElem(SURENAMES),
    coatColor: getRandomElem(COAT_COLORS),
    eyesColor: getRandomElem(EYES_COLORS)
  };
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
  fragment.appendChild(createWizard());
}

similarListElement.appendChild(fragment);

wizardSettings.querySelector('.setup-similar').classList.remove('hidden');
