import { combineReducers } from "redux";
// import authReducer from "./auth/auth.reducer";
// import toastReducer from "./toast/toast.reducer";
import itemReducer from "./item/item.reducer";
import authReducer from "./auth/auth.reducer";
import userReducer from "./user/user.reducer";

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  items: itemReducer,
});

export default reducers;
