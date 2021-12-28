import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createCommentResult, destroyCommentResult, getAllCommentResult } from "./comment.action";
import { createCommentApi, destroyCommentApi, getAllCommentApi } from "./comment.api";
import types from "./comment.type";

function* getAllCommentSaga(props) {
  const data = props.payload;
  
  try {
    const res = yield call(getAllCommentApi, data);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(getAllCommentResult(response))]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(getAllCommentResult(error, false))]);
  }
}

function* createCommentSaga(props) {
  const data = props.payload;
  try {
    const res = yield call(createCommentApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(createCommentResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* destroyCommentSaga(props) {
  const data = props.payload;
  try {
    const res = yield call(destroyCommentApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(destroyCommentResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_COMMENT, getAllCommentSaga)]);
  yield all([takeEvery(types.CREATE_COMMENT, createCommentSaga)]);
  yield all([takeEvery(types.DESTROY_COMMENT, destroyCommentSaga)]);
}
