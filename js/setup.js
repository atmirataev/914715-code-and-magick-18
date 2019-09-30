'use strict';

(function () {
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var setupPlayer = document.querySelector('.setup-player');

  document.querySelector('.setup-similar').classList.remove('hidden');

  /**
   * @return {HTMLElement} - Волшебник с конкретными данными
   */
  var renderWizard = function () {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardData = window.data.createWizard();
    wizardElement.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;

    return wizardElement;
  };

  for (var i = 0; i < window.data.NUMBER_OF_SIMILAR_WIZARDS; i++) {
    fragment.appendChild(renderWizard());
  }

  similarListElement.appendChild(fragment);

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
})();
