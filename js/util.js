'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  /**
   * @param {Array} arr - Массив данных
   * @return {Any} - Случайный элемент массива
   */
  var getRandomElem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  /**
   * @param {Array} arr - Массив данных
   * @return {number} - Случайный индекс
   */
  var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElem: getRandomElem,
    getRandomIndex: getRandomIndex,
  };
})();
