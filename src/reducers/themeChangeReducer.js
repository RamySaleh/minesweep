import * as actions from "../actions/actions";

let theme = {
  color: "#8FCEEF",
  fontColor: "#0E547B",
  disabledColor: "#6FC2EE",
};

const themeChangeReducer = (state = theme, action) => {
  switch (action.type) {
    case actions.COLOR_CHANGED:
      return action.payload;
    default:
      return state;
  }
};

export default themeChangeReducer;
