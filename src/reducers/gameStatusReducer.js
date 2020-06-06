import * as constants from "../constants";
const gameStatus = (state = constants.GameStatusInitial, action) => {
  switch (action.type) {
    case "GAME_WON":
      return constants.GameStatusWon;
    case "GAME_LOST":
      return constants.GameStatusLost;
    default:
      return state;
  }
};

export default gameStatus;
