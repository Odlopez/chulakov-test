'use strict';

(function () {
  // Создает попап со системным сообщением
  window.popup = function (text) {
    var template = document.querySelector('.' + window.constants.CLASSES.TEMPLATE);
    var popup = template.querySelector('.' + window.constants.CLASSES.POPUP).cloneNode(true);
    var message = popup.querySelector('.' + window.constants.CLASSES.POPUP_MESSAGE);

    // Обработчик события при клике на попап (удаляет его)
    var onPopupClick = function () {
      if (popup.parentElement) {
        document.body.removeChild(popup);

        popup.removeEventListener('click', onPopupClick);
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    }

    // Обработчик события при нажатии клавиши esc на документе (удаляет попап)
    var onDocumentKeydown = function (e) {
      e.preventDefault();

      if (e.keyCode === window.constants.KEY_CODE.ESC) {
        onPopupClick();
      }
    }

    message.textContent = text;

    document.body.appendChild(popup);

    // Если пользователь не закрыл попап самостоятельно, сообщение изсчезает само по истечении заданного времени
    setTimeout(function () {
      onPopupClick()
    }, window.constants.CLOSING_POPUP_TIME);

    popup.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
})();
