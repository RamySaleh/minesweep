import * as actions from "../actions/actions";
import * as constants from "../constants";

const colorChangeReducer = (state = constants.InitialColor, action) => {
  switch (action.type) {
    case actions.COLOR_CHANGED:
      return action.payload;
    default:
      return state;
  }
};

export default colorChangeReducer;
