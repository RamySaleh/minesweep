import colorChangeReducer from "./themeReducer";
import { combineReducers } from "redux";
import gameStatusReducer from "./gameStatusReducer";

const rootReducer = combineReducers({
  gameStatusReducer,
  colorChangeReducer,
});

export default rootReducer;
