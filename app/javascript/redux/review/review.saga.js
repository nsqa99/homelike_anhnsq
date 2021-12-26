import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createReviewResult, destroyReviewResult } from "./review.action";
import { createReviewApi, destroyReviewApi } from "./review.api";
import types from "./review.type";

function* getAllReviewSaga() {
}

function* createReviewSaga(props) {
  const data = props.payload;
  try {
    const res = yield call(createReviewApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(createReviewResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* destroyReviewSaga(props) {
  const data = props.payload;
  try {
    const res = yield call(destroyReviewApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(destroyReviewResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.CREATE_REVIEW, createReviewSaga)]);
  yield all([takeEvery(types.DESTROY_REVIEW, destroyReviewSaga)]);
}
