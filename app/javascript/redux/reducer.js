import { combineReducers } from "redux";
// import authReducer from "./auth/auth.reducer";
// import toastReducer from "./toast/toast.reducer";
import itemReducer from "./item/item.reducer";

const reducers = combineReducers({
  // auth: authReducer,
  // toast: toastReducer,
  items: itemReducer,
});

export default reducers;
