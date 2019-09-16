'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10; // Тень облака
var GAP = 20; // общий отступ
var BAR_HEIGHT = 150; // высота максимального столбца
var BAR_WIDTH = 40;
var BAR_MARGIN = 50; // ширина между столбцами

/**
 * @description создает облако
 * @param {string} ctx контекст канваса
 * @param {number} x расположение по горизонтали
 * @param {number} y расположение по вертикали
 * @param {string} color цвет
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * @param {array} arr массив чисел c результатами прохождения игры
 * @return {number} максимальный результат
 */
// var getMaxElement = function (arr) {
//   var maxElement = arr[0];

//   for (var i = 1; i < arr.length; i++) {
//     if (arr[i] > maxElement) {
//       maxElement = arr[i];
//     }
//   }
//   return maxElement;
// };
/**
 *
 * @param {Array} arr
 */
var getMaxElement = function (arr) {
  return Math.max.apply(null, arr)
};

/**
 * @description создает статистику прохождения игры
 * @param {string} ctx контекст канваса
 * @param {array} names массив имён игроков
 * @param {array} times массив чисел c результатами прохождения игры
 */
window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);
  /**
   * @return {string} получаем синий цвет с разной насыщенностью
   */
  var getRandomBlueColor = function () {
    var randomSaturation = Math.floor(Math.random() * (100 + 1));
    return 'hsl(230, ' + randomSaturation + '%, 50%)';
  };

  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + 2 * GAP);

  for (var i = 0; i < names.length; i++) {
    var currentHeight = (BAR_HEIGHT * times[i]) / maxTime; // Высота текущего столбца в пропорции c максимальным столбцом

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_MARGIN + (BAR_WIDTH + BAR_MARGIN) * i, CLOUD_HEIGHT - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomBlueColor();
    }

    ctx.fillRect(CLOUD_X + BAR_MARGIN + (BAR_WIDTH + BAR_MARGIN) * i, CLOUD_HEIGHT - currentHeight - GAP * 1.5, BAR_WIDTH, currentHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_MARGIN + (BAR_WIDTH + BAR_MARGIN) * i, CLOUD_HEIGHT - currentHeight - GAP * 2.5);
  }
};
