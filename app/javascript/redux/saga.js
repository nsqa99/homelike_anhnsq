import { all } from "redux-saga/effects";
import authSagas from "./auth/auth.saga";
import userSagas from "./user/user.saga";
import itemSagas from "./item/item.saga";
import reviewSagas from "./review/review.saga";
import commentSagas from "./comment/comment.saga";
import postSagas from "./post/post.saga";
import orderSagas from "./order/order.saga";
import toastSagas from "./toast/toast.saga";
import tagSagas from "./tag/tag.saga";

export default function* rootSaga() {
  yield all([
    authSagas(),
    userSagas(),
    itemSagas(),
    reviewSagas(),
    commentSagas(),
    postSagas(),
    orderSagas(),
    toastSagas(),
    tagSagas()
  ]);
}
