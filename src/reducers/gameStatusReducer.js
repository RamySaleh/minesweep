import * as constants from "../constants";
import * as actions from "../actions/actions";

const gameStatus = (state = constants.GameStatusInitial, action) => {
  switch (action.type) {
    case actions.GAME_START:
      return constants.GameStatusStart;
    case actions.GAME_PLAYING:
      return constants.GameStatusPlaying;
    case actions.GAME_WON:
      return constants.GameStatusWon;
    case actions.GAME_LOST:
      return constants.GameStatusLost;
    default:
      return state;
  }
};

export default gameStatus;
