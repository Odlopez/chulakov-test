"use strict";!function(){var e={"number-1":"В поле должно быть введенно 4 цифры","number-2":"В поле должно быть введенно 4 цифры","number-3":"В поле должно быть введенно 4 цифры","number-4":"В поле должно быть введенно 4 цифры",month:"Месяц необходимо ввести в формате двух цифр",year:"Месяц необходимо ввести в формате 4 цифр","user-name":"Поле должно содержать символы латинского алфавита не менее 4-х","CVV2/CVC2":"Введите 3 цифры"},i=(new Date).getFullYear();window.hint=function(t){t.validity.tooLong?t.setCustomValidity("Введенное значение больше заданной максимальной длинны"):t.validity.tooShort?t.setCustomValidity("Введенное значение меньше заданной минимальной длинны"):t.validity.patternMismatch?t.setCustomValidity(e[t.name]):t.validity.valueMissing?t.setCustomValidity("Заполните поле"):t.setCustomValidity(""),"month"===t.name&&(t.value<"01"||"12"<t.value)&&t.setCustomValidity(e[t.name]),"year"===t.name&&(t.value<i||t.value>i+50)&&t.setCustomValidity(e[t.name])}}();