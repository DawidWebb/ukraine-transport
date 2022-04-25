import { combineReducers } from "redux";

import { cookieReducer } from "./cookieReducer";
import { kindOfItemReducer } from "./kindOfItemReducer";

import { localStorageReducer } from "./localStorageReducer";
import { needsItemReducer } from "./needsItemReducer";
import { sessionStorageReducer } from "./sessionStorageReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";
import { transportItemReducer } from "./transportItemReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  cookie: cookieReducer,
  kindOfItem: kindOfItemReducer,

  localStorage: localStorageReducer,
  needsItem: needsItemReducer,
  sessionStorege: sessionStorageReducer,
  spinner: spinnerReducer,
  task: taskReducer,
  transportItem: transportItemReducer,
  user: userReducer,
});
