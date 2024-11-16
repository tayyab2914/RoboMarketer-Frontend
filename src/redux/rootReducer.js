import { combineReducers } from "redux";
import authReducer from "./AuthToken/Reducer";

const rootReducer = combineReducers({
  authToken: authReducer,
});

export default rootReducer;
