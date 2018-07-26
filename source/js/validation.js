'use strict';

(function () {
  var form = document.querySelector('.form');
  var submit = document.querySelector('.form__submit');
  var firstFieldset = document.querySelector('.form__fieldset');
  var firstSelect = document.querySelector('.select');

  // Переводит фокус на следующий элемент от текущего (который передается в аргумент)
  var focuseOnNextElement = function (element) {
    element.nextElementSibling.focus();
  }

  // Вешает на поля ввода номера карточки обработчик события, который автоматически переводит фокус на следующее поле, когда текущее заполнено
  var changeInputFocus = function () {
    /*
      Обработчик события ввода данных в поле номера карточки.
      Если введено 4 символа, запускает функцию перевода фокуса на следующий элемент
    */
    var onElementInput = function (e) {
      var currentItem = e.target;
      if (currentItem.value.length === 4 && currentItem.nextElementSibling) {
        focuseOnNextElement(currentItem);
      }
    }

    Array.prototype.slice.call(firstFieldset.children).forEach(function (it) {
      it.addEventListener('input', onElementInput);
    });
  };

  // Вешает на первый select обработчик события, который переводит фокус на следующий select, при внесении изменения в пером.
  var changeSelectFocus = function () {
    // Обработчик события изменения значения в первом select'е
    var onElementChange = function (e) {
      focuseOnNextElement(e.target);
    }

    firstSelect.addEventListener('change', onElementChange);
  };

  // Обработчик события ввода данных в поля формы
  var onElementInput = function (e) {
    marksInvalid(e.target);
  }

  // Функция помечает неверно заполненные поля, или одно конкретное поле, если в качестве аргумента передан конкретный элемент
  var marksInvalid = function (elem) {
    if (elem) { // Помечаем конкретный элемент и создаем кастомное сообщение валидации
      window.hint(elem);

      if (!elem.validity.valid) {
        elem.classList.add(window.constants.CLASSES.ERROR);
      } else {
        elem.classList.remove(window.constants.CLASSES.ERROR);
      }
    } else { // Если конкретный элемент не был передан в качестве аргумента, проходимся по всей форме
      Array.prototype.slice.call(form.elements).forEach(function (it) {
        window.hint(it);

        if (!it.validity.valid) {
          it.classList.add(window.constants.CLASSES.ERROR);
        } else {
          it.classList.remove(window.constants.CLASSES.ERROR);
        }
      })
    }
  };

  // Проверяет все поля формы внутри fieldset'ов и в случае ошибки, выводит сообщение с подсказкой
  var displayHint = function () {
    Array.prototype.slice.call(form.elements).forEach(function (it) {
      for (var i = 0; i < it.children.length; i++) {
        if (it.children[i].validity && !it.children[i].validity.valid) {
          window.createErrorMessage(it, it.children[i].validationMessage);
          return;
        } else {
          window.createErrorMessage(it, '');
        }
      }
    });
  };

  // Обработчик события удачной загрузки данных формы
  var onSuccessfulUpload = function () {
    window.popup('Данные успешно отправлены!');
    form.reset();
  }

  // Обработчик события неудачной загрузки данных формы
  var onUnsuccessfulUpload = function (text) {
    window.popup(text);
  }

  // Навешивает обработчики события ввода данных в поля форм
  var makeInputsEvent = function () {
    Array.prototype.slice.call(form.elements).forEach(function (it) {
      if (it.tagName.toLowerCase() === 'input' || it.tagName.toLowerCase() === 'select') {
        it.addEventListener('input', onElementInput);
      } else if (it.tagName.toLowerCase() === 'fieldset') {
        it.addEventListener('change', displayHint);
      }
    });
  }

  // Возвращает true, если все элементы формы прошли проверку валидации
  var checkFormValidity = function () {
    var isValidity = true;

    Array.prototype.slice.call(form.elements).forEach(function (it) {
      if (!it.validity.valid) {
        isValidity = false;
      }
    });

    return isValidity;
  }

  // Обработчик события отправки формы
  var onsubmitClick = function (e) {
    e.preventDefault();
    marksInvalid();
    makeInputsEvent();
    displayHint();

    if (checkFormValidity()) {
      var data = new FormData();
      window.backend('POST', window.constants.URL, onSuccessfulUpload, onUnsuccessfulUpload, data);
    }
  }

  submit.addEventListener('click', onsubmitClick);
  changeInputFocus();
  changeSelectFocus();
})();
