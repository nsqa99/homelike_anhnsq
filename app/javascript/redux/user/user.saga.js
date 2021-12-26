import { all, call, put, takeEvery } from "redux-saga/effects";

import { getOneUserResult } from "./user.action";
import { getOneUserApi } from "./user.api";
import types from "./user.type";

function* getOneUserSaga(props) {
  const { data } = props.payload;
  try {
    const res = yield call(getOneUserApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(getOneUserResult(response))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getOneUserResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ONE_USER, getOneUserSaga)]);
}
