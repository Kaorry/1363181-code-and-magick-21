'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 20;
const LINE = 40;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (times) {
  const maxElement = times[0];

  for (let i = 1; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;

  const texts = [`Ура вы победили!`, `Список результатов:`];

  for (let i = 0; i < texts.length; i++) {
    ctx.fillText(
        texts[i],
        CLOUD_X + FONT_GAP,
        CLOUD_Y + FONT_GAP * (i + 1)
    );
  }

  const maxTime = getMaxElement(times);

  for (let j = 0; j < names.length; j++) {
    ctx.fillText(
        names[j],
        CLOUD_X + FONT_GAP + FONT_GAP + (BAR_WIDTH + BAR_GAP) * j,
        CLOUD_HEIGHT - FONT_GAP
    );
    ctx.fillText(
        Math.ceil(times[j]),
        CLOUD_X + LINE + (BAR_WIDTH + BAR_GAP) * j,
        CLOUD_HEIGHT - GAP - LINE - (BAR_HEIGHT * times[j]) / maxTime
    );

    if (names[j] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      let randSaturation = Math.ceil(Math.random() * 100);
      ctx.fillStyle = `hsl(240, ` + randSaturation + `%, 50%)`;
    }

    ctx.fillRect(
        CLOUD_X + LINE + (BAR_WIDTH + BAR_GAP) * j,
        CLOUD_Y + LINE * texts.length + BAR_HEIGHT - (BAR_HEIGHT * times[j]) / maxTime,
        BAR_WIDTH,
        (BAR_HEIGHT * times[j]) / maxTime
    );

    ctx.fillStyle = `#000`;
  }
};
