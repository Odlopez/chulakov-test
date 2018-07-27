'use strict';

(function () {
  // Урезанный полифилл для insertAdjacentElement позиции afterend (других не использовал). В старой мозилле этот метод не работает. Пришлось на коленке изобретать свой.
  if (!Element.prototype.insertAdjacentElement) {
    Element.prototype.insertAdjacentElement = function (position, element) {
      if (position === 'afterend') {
        var parent = this.parentElement;
        parent.insertBefore(element, this.nextElementSibling);
      }
    }
  }
})();
