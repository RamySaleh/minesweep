import { combineReducers } from "redux";
import gameStatusReducer from "./gameStatusReducer";
import themeChangeReducer from "./themeChangeReducer";

const rootReducer = combineReducers({
  gameStatusReducer,
  themeChangeReducer,
});

export default rootReducer;
