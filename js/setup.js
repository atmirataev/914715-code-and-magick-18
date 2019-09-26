'use strict';

var NUMBER_OF_SIMILAR_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
var setupUserNameInput = setup.querySelector('.setup-user-name'); // Поле ввода имени волшебника.
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
var setupPlayer = document.querySelector('.setup-player');

document.querySelector('.setup-similar').classList.remove('hidden');

/**
 * @param {Array} arr - Массив данных
 * @return {Any} - Случайный элемент массива
 */
var getRandomElem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * @return {Object} - Возвращает структуру волшебника
 */
var createWizard = function () {
  var wizard = {
    name: getRandomElem(WIZARD_NAMES) + ' ' + getRandomElem(WIZARD_SURNAMES),
    coatColor: getRandomElem(COAT_COLORS),
    eyesColor: getRandomElem(EYES_COLORS)
  };
  return wizard;
};

/**
 * @return {HTMLElement} - Волшебник с конкретными данными
 */
var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  var wizardData = createWizard();
  wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

  return wizardElement;
};

for (var i = 0; i < NUMBER_OF_SIMILAR_WIZARDS; i++) {
  fragment.appendChild(renderWizard());
}

similarListElement.appendChild(fragment);

/**
 * @description - Закрывает попап по нажатию Esc
 * @param {Event} evt - Объект event
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

/**
 * @description - Показывает попап и добавляет обработчик события на нажатие Esc
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/**
 * @description - Скрывает попап и удаляет обработчик события на нажатие Esc
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Добавляет обработчик события, при котором не произойдет закрытие попапа по нажатию на Esc, если фокус - на поле ввода имени волшебника
setupUserNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupUserNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

wizardCoat.addEventListener('click', function () {
  var wizardCoatColor = getRandomElem(COAT_COLORS);
  wizardCoat.style = 'fill: ' + wizardCoatColor;
  setupPlayer.querySelector('input[name="coat-color"]').value = wizardCoatColor;
});

wizardEyes.addEventListener('click', function () {
  var wizardEyesColor = getRandomElem(EYES_COLORS);
  wizardEyes.style = 'fill:' + wizardEyesColor;
  setupPlayer.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
});

setupFireballWrap.addEventListener('click', function () {
  var fireballColor = getRandomElem(FIREBALL_COLORS);
  setupFireballWrap.style = 'background-color: ' + fireballColor;
  setupFireballWrap.querySelector('input[name="fireball-color"]').value = fireballColor;
});
