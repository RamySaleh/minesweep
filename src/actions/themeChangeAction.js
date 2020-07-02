import * as actions from "./actions";

export const colorChanged = (color) => {
  return {
    type: actions.COLOR_CHANGED,
    payload: color,
  };
};
