'use strict';

(function () {
  // Обработчик события клика по сообщению
  var onMessageClick = function (e) {
    var parent = e.target.parentElement;

    parent.removeChild(e.target);
  }

  // Создает сообщение о неверно заполненном поле
  window.createErrorMessage = function (parent, text) {
    var message = document.createElement('span');

    // Удаляет сообщение о неверно заполненном поле, если такое имеется
    var removeErrorMessage = function () {
      var oldMessage = parent.nextElementSibling;

      if (oldMessage && oldMessage.classList.contains(window.constants.CLASSES.ERROR_MESSAGE)) {
        oldMessage.parentElement.removeChild(oldMessage);

        message.removeEventListener('click', onMessageClick);
      }
    }

    removeErrorMessage();

    // Если кастомное сообщение не пустое, создаем 'подсказку' для пользователя
    if (text) {
      message.textContent = text;
      message.classList.add(window.constants.CLASSES.ERROR_MESSAGE);
      message.addEventListener('click', onMessageClick);

      parent.insertAdjacentElement('afterend', message);
    } else ( // Иначе удаляем сообщене с подсказкой о природе невалидности поля
      removeErrorMessage()
    )
  }
})();
