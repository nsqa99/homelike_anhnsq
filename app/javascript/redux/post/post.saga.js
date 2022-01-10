import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {
  createPostResult,
  createReviewResult,
  destroyPostResult,
  destroyReviewResult,
  getAllPostByUsernameResult,
  getAllPostResult,
  getOnePostResult,
  likePostResult,
  resetPostStateResult,
  resetShareStateResult,
  searchPostResult,
  sharePostResult,
  unlikePostResult,
  updatePostResult,
} from "./post.action";
import {
  createFailResult,
  createLoadingResult,
  createSuccessResult,
  removeToastResult,
  resetToastResult,
} from "../toast/toast.action";
import {
  createPostApi,
  createPostReviewApi,
  destroyPostApi,
  destroyPostReviewApi,
  getAllPostApi,
  getAllPostByUsernameApi,
  getOnePostApi,
  likePostApi,
  searchPostApi,
  unlikePostApi,
  updatePostApi,
} from "./post.api";
import types from "./post.type";

function* getAllPostSaga() {
  try {
    yield put(createLoadingResult());
    const res = yield call(getAllPostApi);
    if (res.status === 200) {
      yield all([
        put(getAllPostResult(res.data?.data)),
        put(removeToastResult()),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield all([
      (put(getAllPostResult(error, isSuccess)),
      put(createFailResult("Error when load resource")),
      put(resetToastResult())),
    ]);
  }
}

function* getAllPostByUsernameSaga(props) {
  const { data, options } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(getAllPostByUsernameApi, data, options);
    if (res.status === 200) {
      yield all([
        put(getAllPostByUsernameResult(res.data?.data)),
        put(removeToastResult()),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield all([
      put(getAllPostByUsernameResult(error, isSuccess)),
      put(createFailResult("Error when load resource")),
      put(resetToastResult()),
    ]);
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
  const { params, options } = props.payload;
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

function* resetShareSaga() {
  yield all([put(resetShareStateResult())]);
}

function* createPostSaga(props) {
  const { username, data, images } = props.payload;
  const formData = new FormData();
  formData.append("post[content]", data.content);
  if (data.item_id) {
    formData.append("item_ids[]", [data.item_id]);
  }
  images?.map((image) => {
    formData.append("post[images][]", image);
  });
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  try {
    yield put(createLoadingResult());
    const res = yield call(createPostApi, username, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(createPostResult(response)),
        put(createSuccessResult("Post created")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(createFailResult("Error occured")),
      put(resetToastResult()),
    ]);
  }
}

function* sharePostSaga(props) {
  const { username, data } = props.payload;
  const formData = new FormData();
  formData.append("post[content]", data.content);
  formData.append("item_ids[]", [data.item_id]);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  try {
    const res = yield call(createPostApi, username, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(sharePostResult(response))]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(sharePostResult(error, false))]);
  }
}

function* destroyPostSaga(props) {
  const { username, itemId, isSearch } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(destroyPostApi, username, itemId);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(destroyPostResult(response, isSearch)),
        put(createSuccessResult("Deleted")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(createFailResult("Error occured")),
      put(resetToastResult()),
    ]);
  }
}

function* updatePostSaga(props) {
  const { username, data, itemId, images, isSearch } = props.payload;
  const formData = new FormData();
  formData.append("post[content]", data.content);
  if (data.item_id) {
    formData.append("item_ids[]", [data.item_id]);
  }
  images?.map((image) => {
    formData.append("post[images][]", image);
  });
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  try {
    yield put(createLoadingResult());
    const res = yield call(updatePostApi, username, itemId, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(updatePostResult(response, isSearch)),
        put(createSuccessResult("Updated")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(createFailResult("Error occured")),
      put(resetToastResult()),
    ]);
  }
}

function* likePostSaga(props) {
  const { username, postId } = props.payload;
  try {
    const res = yield call(likePostApi, username, postId);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(likePostResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* unlikePostSaga(props) {
  const { username, postId } = props.payload;
  try {
    const res = yield call(unlikePostApi, username, postId);
    if (res.status === 200) {
      console.log(res);
      const response = res.data;
      yield all([put(unlikePostResult(response))]);
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
  yield all([takeEvery(types.RESET_SHARE_STATE, resetShareSaga)]);
  yield all([takeEvery(types.CREATE_POST, createPostSaga)]);
  yield all([takeEvery(types.SHARE_POST, sharePostSaga)]);
  yield all([
    takeEvery(types.GET_ALL_POST_BY_USERNAME, getAllPostByUsernameSaga),
  ]);
  yield all([takeEvery(types.DESTROY_POST, destroyPostSaga)]);
  yield all([takeEvery(types.UPDATE_POST, updatePostSaga)]);
  yield all([takeEvery(types.LIKE_POST, likePostSaga)]);
  yield all([takeEvery(types.UNLIKE_POST, unlikePostSaga)]);
}
