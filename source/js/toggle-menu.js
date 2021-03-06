'use strict';

(function () {
  var button = document.querySelector('.burger');
  var menu = document.querySelector('.navigation');

  // Обработчик события нажатия на кнопку 'бургер'
  var onButtonClick = function (e) {
    e.target.classList.toggle(window.constants.CLASSES.BURGER_CLOSE);
    menu.classList.toggle(window.constants.CLASSES.VISIBLE);
  }

  // Обработчик события изменения разрешения окна. Сбрасывает в изначальное положение меню и кнопку 'бургер', если 'вышли' из мобильного разрешения
  var onWindowResize = function () {
    if (window.innerWidth > 767) {
      menu.classList.remove(window.constants.CLASSES.VISIBLE);
      button.classList.remove(window.constants.CLASSES.BURGER_CLOSE);
    }
  }

  button.addEventListener('click', onButtonClick);
  window.addEventListener('resize', onWindowResize);
})();
