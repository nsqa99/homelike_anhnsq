import { all, call, put, takeEvery } from "redux-saga/effects";

import { deleteUserResult, followUserResult, getOneUserResult, searchUserResult, unfollowUserResult } from "./user.action";
import { destroyUserApi, followUserApi, getOneUserApi, searchUserApi, unfollowUserApi } from "./user.api";
import types from "./user.type";

function* getOneUserSaga(props) {
  const { data } = props.payload;
  try {
    const res = yield call(getOneUserApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(getOneUserResult(response))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getOneUserResult(error, isSuccess));
  }
}
function* searchUserSaga(props) {
  const { data, options } = props.payload;
  try {
    const res = yield call(searchUserApi, data, options);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(searchUserResult(response))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(searchUserResult(error, isSuccess));
  }
}

function* getAuthUserSaga(props) {
  const { data } = props.payload;
  const isAuth = true;

  try {
    const res = yield call(getOneUserApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(getOneUserResult(response, isAuth))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getOneUserResult(error, isAuth, isSuccess));
  }
}

function* followUserSaga(props) {
  const { follower, followed, onSearch } = props.payload;
  try {
    const res = yield call(followUserApi, follower, followed);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(followUserResult(response, true, onSearch))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(followUserResult(error, isSuccess));
  }
}

function* unfollowUserSaga(props) {
  const { unfollower, unfollowed, onSearch } = props.payload;
  try {
    const res = yield call(unfollowUserApi, unfollower, unfollowed);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(unfollowUserResult(response, true, onSearch))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(unfollowUserResult(error, isSuccess));
  }
}
function* destroyUserSaga(props) {
  const { data } = props.payload;
  try {
    const res = yield call(destroyUserApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(deleteUserResult(response))]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(deleteUserResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ONE_USER, getOneUserSaga)]);
  yield all([takeEvery(types.SEARCH_USER, searchUserSaga)]);
  yield all([takeEvery(types.GET_ONE_USER_AUTH, getAuthUserSaga)]);
  yield all([takeEvery(types.FOLLOW_USER, followUserSaga)]);
  yield all([takeEvery(types.UNFOLLOW_USER, unfollowUserSaga)]);
  yield all([takeEvery(types.DESTROY_USER, destroyUserSaga)]);
}
