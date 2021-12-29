import { all } from "redux-saga/effects";
import authSagas from "./auth/auth.saga";
import userSagas from "./user/user.saga";
import itemSagas from "./item/item.saga";
import reviewSagas from "./review/review.saga";
import commentSagas from "./comment/comment.saga";
import postSagas from "./post/post.saga";

export default function* rootSaga() {
  yield all([
    authSagas(),
    userSagas(),
    itemSagas(),
    reviewSagas(),
    commentSagas(),
    postSagas()
  ]);
}
