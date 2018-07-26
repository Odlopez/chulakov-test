'use strict';

(function () {
  var hintText = {
    'number-1': 'В поле должно быть введенно 4 цифры',
    'number-2': 'В поле должно быть введенно 4 цифры',
    'number-3': 'В поле должно быть введенно 4 цифры',
    'number-4': 'В поле должно быть введенно 4 цифры',
    'month': 'Месяц необходимо ввести в формате двух цифр',
    'year': 'Месяц необходимо ввести в формате 4 цифр',
    'user-name': 'Поле должно содержать символы латинского алфавита не менее 4-х',
    'CVV2/CVC2': 'В поле должно быть введенно 3 цифры',
  };
  var today = new Date();
  var year = today.getFullYear();
  var allowedIntervalYears = 50;

  // Создает кастомное сообщение о неправильно заполненном поле, в зависимости от того, что именно не так ввел пользователь
  window.hint = function (element) {
    if (element.validity.tooLong) {
      element.setCustomValidity('Введенное значение больше заданной максимальной длинны');
    } else if (element.validity.tooShort) {
      element.setCustomValidity('Введенное значение меньше заданной минимальной длинны');
    } else if (element.validity.patternMismatch) {
      element.setCustomValidity(hintText[element.name]);
    } else if (element.validity.valueMissing) {
      element.setCustomValidity('Поле не должно быть пустым');
    } else {
      element.setCustomValidity('');
    }

    // Если пользователь в отладчике изменит value у select'ов, сообщение об ошибке будет назначенно такому select'у
    if (element.name === 'month' && (element.value < '01' || element.value > '12')) {
      element.setCustomValidity(hintText[element.name]);
    }

    if (element.name === 'year' && (element.value < year || element.value > (year + allowedIntervalYears))) {
      element.setCustomValidity(hintText[element.name]);
    }
  };
})();
