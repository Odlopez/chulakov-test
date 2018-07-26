'use strict';

(function () {
  var selects = document.querySelectorAll('.select');

  // 'Стилизует' все option's в выбранном селекте
  var styleSelect = function (select) {
    Array.prototype.slice.call(select.options).forEach(function (it, i) {
      if (!(i % 2)) {
        it.style.fontWeight = window.constants.selectStyles.FONT_WEIGHT;
      }

      it.style.backgroundColor = window.constants.selectStyles.COLOR;
    });
  };

  // Запускает 'стилизацию' для всех селектов
  Array.prototype.slice.call(selects).forEach(function (it) {
    styleSelect(it);
  });
})();
