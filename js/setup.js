'use strict';

(function () {
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var setupPlayer = document.querySelector('.setup-player');
  var form = window.dialog.setup.querySelector('.setup-wizard-form');

  /**
   * @param {Any} wizard - Oбъект со структурой волшебника
   * @return {HTMLElement} - Готовый волшебник с данными, для отрисовки на странице
   */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  /**
   * При успешном получении данных с сервера, создает 4 волшебников и отрисовывает их в соответствующем блоке
   * @param {Any} wizards - Полученный с сервера массив объектов с данными о волшебниках
   */
  var succesGettingHandler = function (wizards) {
    for (var i = 0; i < window.data.NUMBER_OF_SIMILAR_WIZARDS; i++) {
      var randomIndex = window.util.getRandomIndex(wizards);
      var randomWizard = wizards[randomIndex];
      wizards.splice(randomIndex, 1);
      fragment.appendChild(renderWizard(randomWizard));
    }

    similarListElement.appendChild(fragment);
    window.dialog.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  /**
   *Отрисовывает на странице сообщение об ошибке
   * @param {Any} errorMessage - Текст сообщения об ошибке
   */
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  /**
   * Закрывает форму отправки данных на сервер
   */
  var succesPostingHandler = function () {
    window.dialog.setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), succesPostingHandler, errorHandler);
    evt.preventDefault();
  });

  wizardCoat.addEventListener('click', function () {
    var wizardCoatColor = window.util.getRandomElem(window.data.COAT_COLORS);
    wizardCoat.style = 'fill: ' + wizardCoatColor;
    setupPlayer.querySelector('input[name="coat-color"]').value = wizardCoatColor;
  });

  wizardEyes.addEventListener('click', function () {
    var wizardEyesColor = window.util.getRandomElem(window.data.EYES_COLORS);
    wizardEyes.style = 'fill:' + wizardEyesColor;
    setupPlayer.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
  });

  setupFireballWrap.addEventListener('click', function () {
    var fireballColor = window.util.getRandomElem(window.data.FIREBALL_COLORS);
    setupFireballWrap.style = 'background-color: ' + fireballColor;
    setupFireballWrap.querySelector('input[name="fireball-color"]').value = fireballColor;
  });

  window.backend.load(succesGettingHandler, errorHandler);
})();
