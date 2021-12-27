import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { appendItemDatas } from "../../utils";

import {
  createItemResult,
  createReviewResult,
  destroyReviewResult,
  getAllItemsByUsernameResult,
  getAllItemsResult,
  getOneItemResult,
  resetItemStateResult,
  searchItemResult,
} from "./item.action";
import {
  createItemApi,
  createItemReviewApi,
  destroyItemReviewApi,
  getAllItemsApi,
  getAllItemsByUsernameApi,
  getOneItemsApi,
  searchItemsApi,
} from "./item.api";
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

function* getAllItemsByUsernameSaga(props) {
  const {data, options} = props.payload;
  try {
    const res = yield call(getAllItemsByUsernameApi, data, options);
    if (res.status === 200) {
      yield put(getAllItemsByUsernameResult(res.data));
    }
  } catch (error) {
    console.log(error);
    const isSuccess = false;
    yield put(getAllItemsByUsernameResult(error, isSuccess));
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

function* searchItemSaga(props) {
  const {params, options} = props.payload;
  try {
    const res = yield call(searchItemsApi, params, options);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(searchItemResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* resetItemSaga() {
  yield all([put(resetItemStateResult())]);
}

function* createItemSaga(props) {
  const { username, data, images } = props.payload;
  const formData = appendItemDatas(data, images);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  try {
    const res = yield call(createItemApi, username, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(createItemResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

// function* destroyReviewSaga(props) {
//   const data = props.payload;
//   try {
//     const res = yield call(destroyItemReviewApi, data);
//     if (res.status === 200) {
//       const response = res.data?.data;
//       yield all([put(destroyReviewResult(response))]);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ITEM, getAllItemsSaga)]);
  yield all([takeEvery(types.GET_ONE_ITEM, getOneItemSaga)]);
  yield all([takeEvery(types.SEARCH_ITEM, searchItemSaga)]);
  yield all([takeEvery(types.RESET_ITEM_STATE, resetItemSaga)]);
  yield all([takeEvery(types.CREATE_ITEM, createItemSaga)]);
  yield all([takeEvery(types.GET_ALL_ITEM_BY_USERNAME, getAllItemsByUsernameSaga)]);
  // yield all([takeEvery(types.DESTROY_REVIEW, destroyReviewSaga)]);
}
