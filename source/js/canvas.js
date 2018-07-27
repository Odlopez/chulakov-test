'use strict';

(function () {
  var CIRCLE_RADIUS = 6;
  var LINE_WIDTH = 3;
  var ANIMATION_LINE_DURATION = 1500;
  var ANIMATION_POINT = {
    DURATION: 150,
    INTERVAL: 5
  };
  var lineQuantity = 2;
  var container = document.querySelector('.graf__canvas--inner');
  var reset = document.querySelector('.graf__button--reset');
  var randomButton = document.querySelector('.graf__button--random');
  var colorInput = document.querySelector('.graf__input');
  var select = document.querySelector('select');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var shift = {
    x: canvas.getBoundingClientRect().x,
    y: canvas.getBoundingClientRect().y
  };
  var isRandom = true;
  var points = [];

  // Возвращает координаты клика по канвасу.
  var getCoordinatesInCanvas = function (e) {
    var left = e.clientX + window.pageXOffset - shift.x;
    var top = e.clientY + window.pageYOffset - shift.y;

    return {
      x: left,
      y: top
    }
  }

  // Генерирует и возвращает случайное число в пределах заданных параметров
  var getRandomNumber = function (to, from) {
    from = from || 0;

    return Math.round(Math.random() * (to - from) + from);
  };

  // Генерирует и возвращает случайный цвет в формате rgb
  var getRandomColor = function () {
    return 'rgb(' + getRandomNumber(255) + ',' + getRandomNumber(255) + ',' + getRandomNumber(255) + ')';
  };

  /*
    Обработчик события изменения разрешения окна. Подгоняет холст под размеры родителя.
    Пересчитывает стартовые координаты, сбрасывает все расставленные до этого точки.
  */
  var onWindowResize = function () {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    shift = {
      x: canvas.getBoundingClientRect().x,
      y: canvas.getBoundingClientRect().y
    };

    points.length = 0;
  }

  // Очищает полотно и массив с данными отрисованных точек
  var resetCanvas = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onWindowResize();
  }

  // Записывает данные созданной точки в общий массив с данными по всем точкам
  var recordPointData = function (x, y, color) {
    var poaintData = {};

    poaintData.x = x;
    poaintData.y = y;
    poaintData.color = color;

    points.push(poaintData);
  };

  // Создает точку на полотне канваса
  var createPoint = function (coords) {
    var color = isRandom ? getRandomColor() : colorInput.value;
    var start = new Date();

    recordPointData(coords.x, coords.y, color);

    // Отрисовывает 'точку' на холсте
    var drawPoint = function (progress) {
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, CIRCLE_RADIUS * progress, 0, Math.PI*2,true);
      ctx.fillStyle = color;
      ctx.fill();
    }

    /*
      Пока не истечет заданное время, вызывает функцию отрисовывающую точки,
      и передает ей в качестве аргумента увеличивающий коэфффициент.
    */
    setInterval(function () {
      var timePassed = new Date() - start;
      var progress = timePassed / ANIMATION_POINT.DURATION;

      if (timePassed > ANIMATION_POINT.DURATION) {
        return;
      }

      drawPoint(progress)

    }, ANIMATION_POINT.INTERVAL);
  };

  // Создает линию на полотне
  var renderLine = function (from, to) {
    var firstCathet = to.x - from.x;
    var secondCathet = to.y - from.y;
    var cotangent = secondCathet / firstCathet;
    var startX = from.x;
    var startY = from.y;
    var endX = to.x;
    var endY = to.y;

    // Отрисовывает участок линии (координаты определяются по правилам прямоугольного треугольника)
    var drawLine = function (timePassed) {
      ctx.beginPath();
      ctx.lineWidth = LINE_WIDTH;
      ctx.strokeStyle = from.color;

      ctx.moveTo(startX, startY);

      firstCathet = firstCathet * (1 - timePassed);
      endX = to.x - firstCathet;
      endY = to.y - firstCathet * cotangent;

      ctx.lineTo(endX, endY);
      ctx.stroke();

      startX = endX;
      startY = endY;
    };

    // Функция, запускающая плавную анимацию
    var animateLine = function (duration, func) {
      var start = performance.now();

      requestAnimationFrame(function animate (time) {
        var timeFraction = (time - start) / duration;

        if (timeFraction > 1) timeFraction = 1;

        func(timeFraction);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }

    animateLine(ANIMATION_LINE_DURATION, drawLine);
  };

  // Обработчик события изменения select'а. Задает максимальное количество линий для отрисовки на холсте
  var onSelectChange = function (e) {
    lineQuantity = e.target.value;
  }

  // Обработчик события клика по кнопке рандомного цвета. Клик делает цвета рандомными.
  var onRandomButtonClick = function () {
    isRandom = true;
  };

  // Обработчик события изменения цветового input'а. Делает цвета кнопок и линий - заданными.
  var onColorInputChange = function (e) {
    isRandom = false;
    e.target.style.borderColor = e.target.value;
  }

  // Обработчик события клика по холсту. Собственно, основная функция.
  var onCanvasClick = function (e) {
    createPoint(getCoordinatesInCanvas(e));

    var lastIndex = points.length - 1;
    var count = 1;

    while (count <= lineQuantity && points[lastIndex - count]) {
      renderLine(points[lastIndex], points[lastIndex - count]);
      count++
    }
  }

  canvas.addEventListener('click', onCanvasClick);
  reset.addEventListener('click', resetCanvas);
  select.addEventListener('change', onSelectChange);
  randomButton.addEventListener('click', onRandomButtonClick);
  colorInput.addEventListener('change', onColorInputChange);
  window.addEventListener('resize',onWindowResize);
})();
