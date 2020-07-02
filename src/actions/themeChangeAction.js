import * as actions from "./actions";

export const colorChanged = (theme) => {
  return {
    type: actions.COLOR_CHANGED,
    payload: theme,
  };
};
