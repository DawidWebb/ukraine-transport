import { combineReducers } from "redux";

import { cookieReducer } from "./cookieReducer";
import { localStorageReducer } from "./localStorageReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  cookie: cookieReducer,
  localStorage: localStorageReducer,
  spinner: spinnerReducer,
  task: taskReducer,
  user: userReducer,
});
