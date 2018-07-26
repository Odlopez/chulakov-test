'use strict';

(function () {
  // Отменяет поведение по умолчанию у всех ссылок с 'заглушками'
  Array.prototype.slice.call(document.querySelectorAll('[href="#"]')).forEach(function (it) {
    it.addEventListener('click', function (e) {
      e.preventDefault();
    })
  })
})();
