import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { appendItemDatas } from "../../utils";
import { getAllTag } from "../tag/tag.action";
import {
  createLoadingResult,
  createSuccessResult,
  removeToastResult,
  resetToastResult,
} from "../toast/toast.action";

import {
  createItemResult,
  createReviewResult,
  destroyItemResult,
  destroyReviewResult,
  getAllItemsByUsernameResult,
  getAllItemsResult,
  getOneItemResult,
  resetItemStateResult,
  searchItemResult,
  updateItemResult,
} from "./item.action";
import {
  createItemApi,
  createItemReviewApi,
  destroyItemApi,
  destroyItemReviewApi,
  getAllItemsApi,
  getAllItemsByUsernameApi,
  getOneItemsApi,
  searchItemsApi,
  updateItemApi,
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
  const { data, options } = props.payload;
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
  const { params, options } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(searchItemsApi, params, options);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(searchItemResult(response)), put(removeToastResult())]);
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
    yield put(createLoadingResult());
    const res = yield call(createItemApi, username, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(createItemResult(response)),
        put(createSuccessResult("Item created!")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* destroyItemSaga(props) {
  const { username, itemId, isSearch } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(destroyItemApi, username, itemId);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(destroyItemResult(response, isSearch)),
        put(createSuccessResult("Deleted!")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateItemSaga(props) {
  const { username, data, itemId, images, isSearch } = props.payload;
  const formData = appendItemDatas(data, images);
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  try {
    yield put(createLoadingResult());
    const res = yield call(updateItemApi, username, itemId, formData, config);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(updateItemResult(response, isSearch)),
        put(createSuccessResult("Updated!")),
        put(resetToastResult()),
        put(getAllTag()),
      ]);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ITEM, getAllItemsSaga)]);
  yield all([takeEvery(types.GET_ONE_ITEM, getOneItemSaga)]);
  yield all([takeEvery(types.SEARCH_ITEM, searchItemSaga)]);
  yield all([takeEvery(types.RESET_ITEM_STATE, resetItemSaga)]);
  yield all([takeEvery(types.CREATE_ITEM, createItemSaga)]);
  yield all([
    takeEvery(types.GET_ALL_ITEM_BY_USERNAME, getAllItemsByUsernameSaga),
  ]);
  yield all([takeEvery(types.DESTROY_ITEM, destroyItemSaga)]);
  yield all([takeEvery(types.UPDATE_ITEM, updateItemSaga)]);
}
