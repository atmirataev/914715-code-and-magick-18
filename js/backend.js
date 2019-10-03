'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick/data';

  /**
   *Функия, получающая данные с сервера
   * @param {Function} onLoad - Callback, который срабатыает при успешном выполнении запроса
   * @param {Function} onError - Callback, который не срабатыает при успешном выполнении запроса
   */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  /**
   *A
   * @param {Object} data - Oбъект FormData, который содержит данные формы, которые будут отправлены на сервер
   * @param {Function} onLoad - Callback, который срабатыает при успешном выполнении запроса
   * @param {Function} onError - Callback, который не срабатыает при успешном выполнении запроса
   */
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
