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

const TEXTS = [`Ура вы победили!`, `Список результатов:`];

const Color = {
  CLOUD_SHADOW: `rgba(0, 0, 0, 0.7)`,
  WHITE: `#fff`,
  BLACK: `#000`,
  FOR_PLAYER: `rgba(255, 0, 0, 1)`
};

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getRandom = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const getRandomColor = () => `hsl(240, ` + getRandom(0, 100) + `%, 50%)`;
const getColorForPlayer = (playerName) => playerName === `Вы` ? Color.FOR_PLAYER : getRandomColor();

const getMaxElement = (times) => {
  let maxElement = times[0];

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
      Color.CLOUD_SHADOW
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      Color.WHITE
  );

  ctx.fillStyle = Color.BLACK;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;

  TEXTS.forEach((text, index) => {
    ctx.fillText(
        text,
        CLOUD_X + FONT_GAP,
        CLOUD_Y + FONT_GAP * (index + 1)
    );
  });

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillText(
        names[i],
        CLOUD_X + FONT_GAP + FONT_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - FONT_GAP
    );
    ctx.fillText(
        Math.ceil(times[i]),
        CLOUD_X + LINE + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP - LINE - (BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = getColorForPlayer(names[i]);

    ctx.fillRect(
        CLOUD_X + LINE + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + LINE * TEXTS.length + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime,
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = Color.BLACK;
  }
};
