import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import types from "./auth.type";
import { loginApi, registerApi } from "./auth.api";
import { loginResult, registerResult, resetRegisterRedirect, setCurrentUser } from "./auth.action";
import {
  createLoadingResult,
  createSuccessResult,
  createFailResult,
  resetToastResult,
  removeToastResult,
} from "../toast/toast.action";
import { appendRegisterDatas } from "../../utils";

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
        put(createSuccessResult("Success")),
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
  const { data, image } = props.payload;
  try {

    yield put(createLoadingResult());
    const res = yield call(registerApi, appendRegisterDatas(data, image));
    if (res.status === 200) {
      yield all([
        put(registerResult(true)),
        put(createSuccessResult("Register Success")),
        put(resetToastResult()),
        put(resetRegisterRedirect())
      ]);
    }
  } catch (error) {
    const isSuccess = false;
    yield all([
      put(registerResult(isSuccess)),
      put(createFailResult(error.response.data.message)),
      put(resetToastResult()),
    ]);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(types.LOGIN, loginSaga)]);
  yield all([takeLatest(types.REGISTER, registerSaga)]);
}
