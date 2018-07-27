'use strict';

(function () {
  // Создает XMLHttpRequest-объект и отправляет HTTP-запрос на сервер
  window.backend = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';
    xhr.timeout = window.constants.TIMEOUT;

    xhr.send(data);

    // При успешной загрузке данных, выполняет переданные в качестве аргументов функции.
    xhr.addEventListener('load', function (e) {
      try {
        onLoad();
      } catch (err) {
        onError('Ошибка: ' + err.name + ' ' + err.message);
      }
    });

    // При неудачной загрузке выполняется соответствующая функция, переданная в качестве аргумента
    xhr.addEventListener('timeout', function () {
      onError('Загрузка не была осуществленна за ' + window.constants.TIMEOUT / 1000 + ' секунд')
    });

    xhr.addEventListener('error', function (e) {
      onError('Ошибка: статус загрузки ' + e.target.status);
    })
  }
})();
