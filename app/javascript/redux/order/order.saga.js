import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  confirmPaymentResult,
  createOrderResult,
  destroyOrderResult,
  getAllOrderMerchantResult,
  getAllOrderResult,
  getOneOrderByItemResult,
  getOneOrderResult,
  makePayoutResult,
} from "./order.action";
import {
  confirmPaymentApi,
  createOrderApi,
  destroyOrderApi,
  getAllOrderApi,
  getAllOrderMerchantApi,
  getOneOrderApi,
  getOneOrderByItemApi,
  makePayoutApi,
  updateOrderApi,
} from "./order.api";
import types from "./order.type";
import {
  createLoadingResult,
  createSuccessResult,
  createFailResult,
  resetToastResult,
  removeToastResult,
} from "../toast/toast.action";

function* getAllOrderSaga(props) {
  const { username, options } = props.payload;

  try {
    yield put(createLoadingResult());
    const res = yield call(getAllOrderApi, username, options);
    if (res.status === 200) {
      const response = res.data;
      yield all([
        put(getAllOrderResult(response)),
        put(removeToastResult()),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(getAllOrderResult(error, false)),
      put(createFailResult("Error when load resource")),
      put(resetToastResult()),
    ]);
  }
}

function* getAllOrderMerchantSaga(props) {
  const { username, options } = props.payload;

  try {
    yield put(createLoadingResult());
    const res = yield call(getAllOrderMerchantApi, username, options);
    if (res.status === 200) {
      const response = res.data;
      yield all([
        put(getAllOrderMerchantResult(response)),
        put(removeToastResult()),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(getAllOrderMerchantResult(error, false)),
      put(createFailResult("Error when load resource")),
      put(resetToastResult()),
    ]);
  }
}

function* getOneOrderSaga(props) {
  const { username, orderId } = props.payload;

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
  const { username, itemId } = props.payload;

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
  const { username, data } = props.payload;
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

function* updateOrderSaga(props) {
  const { username, orderId, data } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(updateOrderApi, username, orderId, data);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(createOrderResult(response)),
        put(createSuccessResult("Updated")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(createFailResult("Error")),
      put(resetToastResult()),
    ]);
  }
}

function* destroyOrderSaga(props) {
  const { username, orderId } = props.payload;
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

function* confirmPaymentSaga(props) {
  const { username, orderId } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(confirmPaymentApi, username, orderId);
    if (res.status === 200) {
      yield all([
        put(confirmPaymentResult("paid")),
        put(createSuccessResult("Payment success!")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(confirmPaymentResult(error, false)),
      put(createFailResult("Payment process failed. Please try again later.")),
      put(resetToastResult()),
    ]);
  }
}

function* makePayoutSaga(props) {
  const { username, orderId } = props.payload;
  try {
    yield put(createLoadingResult());
    const res = yield call(makePayoutApi, username, orderId);
    if (res.status === 200) {
      const response = res.data?.data;
      yield all([
        put(makePayoutResult(response)),
        put(createSuccessResult("Payout success!")),
        put(resetToastResult()),
      ]);
    }
  } catch (error) {
    console.log(error);
    yield all([
      put(makePayoutResult(error, false)),
      put(createFailResult("Payout process failed. Please try again later.")),
      put(resetToastResult()),
    ]);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_ORDER, getAllOrderSaga)]);
  yield all([takeEvery(types.GET_ALL_ORDER_MERCHANT, getAllOrderMerchantSaga)]);
  yield all([takeEvery(types.CREATE_ORDER, createOrderSaga)]);
  yield all([takeEvery(types.UPDATE_ORDER, updateOrderSaga)]);
  yield all([takeEvery(types.DESTROY_ORDER, destroyOrderSaga)]);
  yield all([takeEvery(types.GET_ONE_ORDER, getOneOrderSaga)]);
  yield all([takeEvery(types.GET_ONE_BY_ITEM_ORDER, getOneOrderByItemSaga)]);
  yield all([takeEvery(types.CONFIRM_PAYMENT, confirmPaymentSaga)]);
  yield all([takeEvery(types.MAKE_PAYOUT, makePayoutSaga)]);
}
