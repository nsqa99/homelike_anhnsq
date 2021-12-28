import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {
  createPostResult,
  createReviewResult,
  destroyPostResult,
  destroyReviewResult,
  getAllPostByUsernameResult,
  getAllPostResult,
  getOnePostResult,
  resetPostStateResult,
  searchPostResult,
  updatePostResult,
} from "./post.action";
import {
  createPostApi,
  createPostReviewApi,
  destroyPostApi,
  destroyPostReviewApi,
  getAllPostApi,
  getAllPostByUsernameApi,
  getOnePostApi,
  searchPostApi,
  updatePostApi,
} from "./post.api";
import types from "./post.type";

function* getAllPostSaga() {
  try {
    const res = yield call(getAllPostApi);
    if (res.status === 200) {
      yield put(getAllPostResult(res.data?.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllPostResult(error, isSuccess));
  }
}

function* getAllPostByUsernameSaga(props) {
  const {data, options} = props.payload;
  try {
    const res = yield call(getAllPostByUsernameApi, data, options);
    if (res.status === 200) {
      yield put(getAllPostByUsernameResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllPostByUsernameResult(error, isSuccess));
  }
}

function* getOnePostSaga(props) {
  const { data } = props.payload;
  try {
    const res = yield call(getOnePostApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(getOnePostResult(response))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getOnePostResult(error, isSuccess));
  }
}

function* searchPostSaga(props) {
  const {params, options} = props.payload;
  try {
    const res = yield call(searchPostApi, params, options);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(searchPostResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* resetPostSaga() {
  yield all([put(resetPostStateResult())]);
}

function* createPostSaga(props) {
  const { username, data, images } = props.payload;
  const formData = appendPostDatas(data, images);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  try {
    const res = yield call(createPostApi, username, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(createPostResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* destroyPostSaga(props) {
  const {username, itemId, isSearch} = props.payload;
  try {
    const res = yield call(destroyPostApi, username, itemId);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(destroyPostResult(response, isSearch))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatePostSaga(props) {
  const {username, data, itemId, images, isSearch} = props.payload;
  const formData = appendPostDatas(data, images);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  try {
    const res = yield call(updatePostApi, username, itemId, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(updatePostResult(response, isSearch))]);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_POST, getAllPostSaga)]);
  yield all([takeEvery(types.GET_ONE_POST, getOnePostSaga)]);
  yield all([takeEvery(types.SEARCH_POST, searchPostSaga)]);
  yield all([takeEvery(types.RESET_POST_STATE, resetPostSaga)]);
  yield all([takeEvery(types.CREATE_POST, createPostSaga)]);
  yield all([takeEvery(types.GET_ALL_POST_BY_USERNAME, getAllPostByUsernameSaga)]);
  yield all([takeEvery(types.DESTROY_POST, destroyPostSaga)]);
  yield all([takeEvery(types.UPDATE_POST, updatePostSaga)]);
}
