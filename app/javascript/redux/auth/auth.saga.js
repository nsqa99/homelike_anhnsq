import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import types from "./auth.type";
import { loginApi } from "./auth.api";
import { loginResult, setCurrentUser } from "./auth.action";
import {
  createLoadingResult,
  createSuccessResult,
  createFailResult,
  resetToastResult,
  removeToastResult,
} from "../toast/toast.action";

function* loginSaga(props) {
  const { data } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(loginApi, data);
    if (res.status === 200) {
      const response = res.data?.data;
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      yield all([
        put(loginResult(true)),
        put(setCurrentUser(data.user.username)),
        put(createSuccessResult("Login success")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield all([
      put(loginResult(isSuccess)),
      put(createFailResult("Invalid username or password")),
      put(resetToastResult()),
    ]);
  }
}

function* registerSaga(props) {
  const { data } = props.payload;
  try {
    const res = yield call(registerApi, data);
    if (res.data?.success) {
      // setAuthToken(res.headers);
      const secret = "secret";
      const jwt = sign(res.headers, secret);
      localStorage.setItem("token", jwt);
      yield put(registerResult(res));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(registerResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.LOGIN, loginSaga)]);
}
