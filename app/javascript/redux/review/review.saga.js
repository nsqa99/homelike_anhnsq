import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createReviewResult, destroyReviewResult, getAllReviewResult } from "./review.action";
import { createReviewApi, destroyReviewApi, getAllReviewApi } from "./review.api";
import types from "./review.type";

function* getAllReviewSaga(props) {
  const data = props.payload;
  
  try {
    const res = yield call(getAllReviewApi, data);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(getAllReviewResult(response))]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(getAllReviewResult(error, false))]);
  }
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
  yield all([takeEvery(types.GET_ALL_REVIEW, getAllReviewSaga)]);
  yield all([takeEvery(types.CREATE_REVIEW, createReviewSaga)]);
  yield all([takeEvery(types.DESTROY_REVIEW, destroyReviewSaga)]);
}
