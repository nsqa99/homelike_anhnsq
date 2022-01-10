import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getAllTagResult } from "./tag.action";
import { getAllTagApi } from "./tag.api";
import types from "./tag.type";

function* getAllTagSaga() {
  try {
    const res = yield call(getAllTagApi);
    if (res.status === 200) {
      const response = res.data;
      console.log(response)
      yield all([put(getAllTagResult(response))]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(getAllTagResult(error, false))]);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_TAG, getAllTagSaga)]);
}
