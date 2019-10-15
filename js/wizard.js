'use strict';

(function () {
  var COUNT_OF_SIMILAR_WIZARDS = 4;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
  var setupPlayer = document.querySelector('.setup-player');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {},
  };

  wizardCoat.addEventListener('click', function () {
    var wizardCoatColor = window.util.getRandomElem(COAT_COLORS);
    wizardCoat.style = 'fill: ' + wizardCoatColor;
    setupPlayer.querySelector('input[name="coat-color"]').value = wizardCoatColor;
    wizard.onCoatChange(wizardCoatColor);
  });

  wizardEyes.addEventListener('click', function () {
    var wizardEyesColor = window.util.getRandomElem(EYES_COLORS);
    wizardEyes.style = 'fill:' + wizardEyesColor;
    setupPlayer.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
    wizard.onEyesChange(wizardEyesColor);
  });

  setupFireballWrap.addEventListener('click', function () {
    var fireballColor = window.util.getRandomElem(FIREBALL_COLORS);
    setupFireballWrap.style = 'background-color: ' + fireballColor;
    setupFireballWrap.querySelector('input[name="fireball-color"]').value = fireballColor;
  });

  window.wizard = {
    COUNT_OF_SIMILAR_WIZARDS: COUNT_OF_SIMILAR_WIZARDS,
    data: wizard,
  };
})();
