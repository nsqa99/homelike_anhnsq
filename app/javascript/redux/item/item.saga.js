import { all, call, put, takeEvery } from "redux-saga/effects";

import { getAllItemsResult } from "./item.action";
import { getAllItemsApi } from "./item.api";
import types from "./item.type";

function* getAllItemsSaga() {
  try {
    const res = yield call(getAllItemsApi);

    yield put(getAllItemsResult(res));
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllItemsResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ITEM, getAllItemsSaga)]);
}
