'use strict';

(function () {
  var NUMBER_OF_SIMILAR_WIZARDS = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  /**
   * @return {Object} - Структура волшебника
   */
  var createWizard = function () {
    var wizard = {
      name: window.util.getRandomElem(WIZARD_NAMES) + ' ' + window.util.getRandomElem(WIZARD_SURNAMES),
      coatColor: window.util.getRandomElem(COAT_COLORS),
      eyesColor: window.util.getRandomElem(EYES_COLORS)
    };
    return wizard;
  };

  window.data = {
    NUMBER_OF_SIMILAR_WIZARDS: NUMBER_OF_SIMILAR_WIZARDS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    createWizard: createWizard,
  };
})();
