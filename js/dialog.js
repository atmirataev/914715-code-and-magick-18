'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserNameInput = setup.querySelector('.setup-user-name'); // Поле ввода имени волшебника.
  var setupUpload = setup.querySelector('.upload');
  var DIALOG_CENTER = {
    top: 80 + 'px',
    left: 50 + '%',
  };

  /**
   * @description - Закрывает попап по нажатию Esc
   * @param {Event} evt - Объект event
   */
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  /**
   * @description - Показывает попап и добавляет обработчик события на нажатие Esc
   */
  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.style.top = DIALOG_CENTER.top;
    setup.style.left = DIALOG_CENTER.left;
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
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // Добавляет обработчик события, при котором не произойдет закрытие попапа по нажатию на Esc, если фокус - на поле ввода имени волшебника
  setupUserNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  setupUserNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  setupUpload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var onMoseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMoseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMoseMove);
      document.removeEventListener('mouseup', onMoseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          setupUpload.removeEventListener('click', onClickPreventDefault);
        };

        setupUpload.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMoseMove);
    document.addEventListener('mouseup', onMoseUp);
  });
})();
