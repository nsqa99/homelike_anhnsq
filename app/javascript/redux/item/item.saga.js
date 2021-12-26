import { all, call, put, takeEvery } from "redux-saga/effects";

import { getAllItemsResult, getOneItemResult } from "./item.action";
import { getAllItemsApi, getOneItemsApi } from "./item.api";
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

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ITEM, getAllItemsSaga)]);
  yield all([takeEvery(types.GET_ONE_ITEM, getOneItemSaga)]);
}
