import { combineReducers } from "redux";
// import authReducer from "./auth/auth.reducer";
// import toastReducer from "./toast/toast.reducer";
import itemReducer from "./item/item.reducer";
import authReducer from "./auth/auth.reducer";
import userReducer from "./user/user.reducer";
import reviewReducer from "./review/review.reducer";
import commentReducer from "./comment/comment.reducer";
import postReducer from "./post/post.reducer";
import orderReducer from "./order/order.reducer";
import toastReducer from "./toast/toast.reducer";
import types from "./auth/auth.type";

const reducers = combineReducers({
  auth: authReducer,
  users: userReducer,
  items: itemReducer,
  reviews: reviewReducer,
  comments: commentReducer,
  posts: postReducer,
  orders: orderReducer,
  toasts: toastReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

export default rootReducer;
