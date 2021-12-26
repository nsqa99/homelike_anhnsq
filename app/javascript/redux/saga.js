import { all } from "redux-saga/effects";
import authSagas from "./auth/auth.saga";
import userSagas from "./user/user.saga";
import itemSagas from "./item/item.saga";

export default function* rootSaga() {
  yield all([
    authSagas(),
    userSagas(),
    itemSagas(),
  ]);
}
