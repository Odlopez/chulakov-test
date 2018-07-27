'use strict';

(function () {
  var INTERVAL = {
    MIN: 30000,
    MAX: 150000
  }
  var ANIMATION_TIME = 2000;
  var SECRET_CLASS = 'graf__secret--active';
  var MEDIA_BOUNDS = [685, 820, 1200];
  var delay = 30000;
  var secret = document.querySelector('.graf__secret');

  // Генерирует и возвращает случайное число в пределах заданных параметров
  var getRandomNumber = function (to, from) {
    from = from || 0;

    return Math.round(Math.random() * (to - from) + from);
  };

  // Бесконечный цикл без операторов цикла? Выспавшись, я бы такого не придумал.)
  var timer = function (func, duration) {
    setTimeout(func, duration);

  };

  // Запускает 'секретку'.
  var runSecret = function () {
    var isTrueWindowWidth = window.innerWidth >= MEDIA_BOUNDS[2] || (window.innerWidth >= MEDIA_BOUNDS[0] && window.innerWidth <= MEDIA_BOUNDS[1]);

    if (isTrueWindowWidth) {
      secret.classList.add(SECRET_CLASS);

      setTimeout(function() {
        secret.classList.remove(SECRET_CLASS);
      }, ANIMATION_TIME);
    }

    var delay = getRandomNumber(INTERVAL.MIN, INTERVAL.MAX);

    timer(runSecret, delay);
  }

  timer(runSecret, delay);
})();
