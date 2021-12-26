import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { getAllItemsResult, getOneItemResult, searchItemResult } from "./item.action";
import { getAllItemsApi, getOneItemsApi, searchItemsApi } from "./item.api";
import types from "./item.type";

function* getAllItemsSaga() {
  try {
    const res = yield call(getAllItemsApi);
    if (res.status === 200) {
      yield put(getAllItemsResult(res.data?.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllItemsResult(error, isSuccess));
  }
}

function* getOneItemSaga(props) {
  const { data } = props.payload;
  try {
    const res = yield call(getOneItemsApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(getOneItemResult(response))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getOneItemResult(error, isSuccess));
  }
}

function* searchItemSaga(props) {
  const params = props.payload;
  try {
    const res = yield call(searchItemsApi, params);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(searchItemResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ITEM, getAllItemsSaga)]);
  yield all([takeEvery(types.GET_ONE_ITEM, getOneItemSaga)]);
  yield all([takeLatest(types.SEARCH_ITEM, searchItemSaga)]);
}
