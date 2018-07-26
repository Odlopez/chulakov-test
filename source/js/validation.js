'use strict';

(function () {
  var form = document.querySelector('.form');
  var submit = document.querySelector('.form__submit');

  // Обработчик события ввода данных в поля формы
  var onElementInput = function (e) {
    marksInvalid(e.target);
  }

  // Функция помечает неверное заполненные поля, или одно конкретное поле, если в качестве аргумента переданн конкретный элемент
  var marksInvalid = function (elem) {
    if (elem) { // Помечаем конкретный элемент
      window.hint(elem);

      if (!elem.validity.valid) {
        elem.classList.add(window.constats.CLASSES.ERROR);
      } else {
        elem.classList.remove(window.constats.CLASSES.ERROR);
      }
    } else { // Если конкретный элемент не был передан в качестве аргумента, проходимся по всей форме
      Array.prototype.slice.call(form.elements).forEach(function (it) {
        window.hint(it);
        
        if (!it.validity.valid) {
          it.classList.add(window.constats.CLASSES.ERROR);
        } else {
          it.classList.remove(window.constats.CLASSES.ERROR);
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
      console.log('Тут будет функция, которая отправит данные формы');
    }
  }

  submit.addEventListener('click', onsubmitClick);
})();
