'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var form = window.dialog.setup.querySelector('.setup-wizard-form');
  var errorNode = createErrorNode();
  var wizardLoaded = false;
  var wizards = [];
  var coatColor;
  var eyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  /**
   * @param {Any} wizardData - Oбъект со структурой волшебника
   * @return {HTMLElement} - Готовый волшебник с данными, для отрисовки на странице
   */
  var renderWizard = function (wizardData) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (data) {
    if (!wizardLoaded) {
      for (var i = 0; i < window.wizard.COUNT_OF_SIMILAR_WIZARDS; i++) {
        fragment.appendChild(renderWizard(data[i]));
      }
    }
    wizardLoaded = true;
    similarListElement.appendChild(fragment);
    window.dialog.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var updateWizards = function () {
    renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  /**
   * При успешном получении данных с сервера, создает 4 волшебников и отрисовывает их в соответствующем блоке
   * @param {Any} data - Полученный с сервера массив объектов с данными о волшебниках
   */
  var succesGettingHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  /**
   * @return {HTMLElement} - DOM-элемент сообщения об ошибке
   */
  function createErrorNode() {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; display: none;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    document.body.insertAdjacentElement('afterbegin', node);

    return node;
  }

  /**
   * Показывает сообщение об ошибке
   * @param {Any} errorMessage - Текст сообщения об ошибке
   */
  var errorHandler = function (errorMessage) {
    errorNode.style.display = 'block';
    errorNode.textContent = errorMessage;
  };

  document.addEventListener('click', function () {
    errorNode.style.display = 'none';
  });

  /**
   * Закрывает форму отправки данных на сервер
   */
  var succesPostingHandler = function () {
    window.dialog.setup.classList.add('hidden');
  };

  window.wizard.data.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.data.onCoatChange = function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), succesPostingHandler, errorHandler);
    evt.preventDefault();
  });

  window.backend.load(succesGettingHandler, errorHandler);

  window.setup = {
    succesGettingHandler: succesGettingHandler,
    errorHandler: errorHandler,
  };
})();
