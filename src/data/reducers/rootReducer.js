import { combineReducers } from "redux";

import { cookieReducer } from "./cookieReducer";
import { languageReducer } from "./languageReducer";
import { localStorageReducer } from "./localStorageReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";
import { transportItemReducer } from "./transportItemReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  cookie: cookieReducer,
  language: languageReducer,
  localStorage: localStorageReducer,
  spinner: spinnerReducer,
  task: taskReducer,
  transportItem: transportItemReducer,
  user: userReducer,
});
