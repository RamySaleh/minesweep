import * as actions from "./actions";

export const gameStart = () => {
  return {
    type: actions.GAME_START,
  };
};

export const gamePlaying = () => {
  return {
    type: actions.GAME_PLAYING,
  };
};

export const gameWon = () => {
  return {
    type: actions.GAME_WON,
  };
};

export const gameLost = () => {
  return {
    type: actions.GAME_LOST,
  };
};
