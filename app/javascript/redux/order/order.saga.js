import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createOrderResult, destroyOrderResult, getAllOrderResult, getOneOrderByItemResult, getOneOrderResult } from "./order.action";
import { createOrderApi, destroyOrderApi, getAllOrderApi, getOneOrderApi, getOneOrderByItemApi } from "./order.api";
import types from "./order.type";

function* getAllOrderSaga(props) {
  const {username, options} = props.payload;
  
  try {
    const res = yield call(getAllOrderApi, username, options);
    if (res.status === 200) {
      const response = res.data;
      yield all([put(getAllOrderResult(response))]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(getAllOrderResult(error, false))]);
  }
}

function* getOneOrderSaga(props) {
  const {username, orderId} = props.payload;
  
  try {
    const res = yield call(getOneOrderApi, username, orderId);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(getOneOrderResult(response))]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(getOneOrderResult(error, false))]);
  }
}

function* getOneOrderByItemSaga(props) {
  const {username, itemId} = props.payload;
  
  try {
    const res = yield call(getOneOrderByItemApi, username, itemId);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(getOneOrderByItemResult(response))]);
    }
  } catch (error) {
    console.log(error);
    yield all([put(getOneOrderByItemResult(error, false))]);
  }
}

function* createOrderSaga(props) {
  const {username, data} = props.payload;
  try {
    const res = yield call(createOrderApi, username, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(createOrderResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* destroyOrderSaga(props) {
  const {username, orderId} = props.payload;
  try {
    const res = yield call(destroyOrderApi, username, orderId);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([put(destroyOrderResult(response))]);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ORDER, getAllOrderSaga)]);
  yield all([takeEvery(types.CREATE_ORDER, createOrderSaga)]);
  yield all([takeEvery(types.DESTROY_ORDER, destroyOrderSaga)]);
  yield all([takeEvery(types.GET_ONE_ORDER, getOneOrderSaga)]);
  yield all([takeEvery(types.GET_ONE_BY_ITEM_ORDER, getOneOrderByItemSaga)]);
}
