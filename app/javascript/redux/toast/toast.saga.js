import { all, call, put, takeEvery } from "redux-saga/effects";
import types from "./toast.type";
import { createFailResult, createLoadingResult, createSuccessResult, resetToastResult } from "./toast.action";

function* createSuccessSaga(props) {
  const { data } = props.payload;
  yield all([put(createSuccessResult(data))]);
}
function* createFailSaga(props) {
  const { data } = props.payload;
  yield all([put(createFailResult(data))]);
}
function* createLoadingSaga(props) {
  const { data } = props.payload;
  yield all([put(createLoadingResult(data))]);
}

function* resetToastSaga() {
  yield all([put(resetToastResult())]);
}

export default function* rootSaga() {
  yield all([takeEvery(types.CREATE_SUCCESS, createSuccessSaga)]);
  yield all([takeEvery(types.CREATE_FAIL, createFailSaga)]);
  yield all([takeEvery(types.CREATE_LOADING, createLoadingSaga)]);
  yield all([takeEvery(types.RESET_TOAST, resetToastSaga)]);
}
