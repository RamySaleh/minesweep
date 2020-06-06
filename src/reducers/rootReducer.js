import { combineReducers } from "redux";
import gameStatusReducer from "./gameStatusReducer";

const rootReducer = combineReducers({
  gameStatusReducer,
});

export default rootReducer;
