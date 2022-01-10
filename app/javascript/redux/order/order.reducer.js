import types from "./order.type";
import _ from "lodash";

const initState = {
  list: [],
  order: {},
  orderItem: {},
};

export default function orderReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_ORDER_SUCCESS: {
      const { data, pagination } = action.payload;
      return {
        ...state,
        list: data,
        pagination: pagination,
      };
    }

    case types.GET_ALL_ORDER_FAILED: {
      return state;
    }

    case types.GET_ALL_ORDER_MERCHANT_SUCCESS: {
      const { data, pagination } = action.payload;
      return {
        ...state,
        list: data,
        pagination: pagination,
      };
    }

    case types.GET_ALL_ORDER_MERCHANT_FAILED: {
      return state;
    }

    case types.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload,
        },
      };
    }
    case types.UPDATE_ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload,
        },
      };
    }

    case types.GET_ONE_ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload,
        },
      };
    }

    case types.GET_ONE_BY_ITEM_ORDER_SUCCESS: {
      return {
        ...state,
        orderItem: {
          ...state.orderItem,
          ...action.payload,
        },
      };
    }

    case types.CREATE_ONE_ORDER_FAILED: {
      return state;
    }

    case types.CONFIRM_PAYMENT_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          status: action.payload,
        },
      };
    }

    case types.CONFIRM_PAYMENT_FAILED: {
      return state;
    }

    case types.MAKE_PAYOUT_SUCCESS: {
      return {
        ...state,
        list: state.list.map((order) => {
          if (order.id === action.payload.order_id) {
            order = { ...order, payout_status: action.payload.status };
          }

          return order;
        }),
      };
    }

    case types.MAKE_PAYOUT_FAILED: {
      return state;
    }

    case types.GET_ONE_ORDER_FAILED: {
      return state;
    }

    case types.GET_ONE_BY_ITEM_ORDER_FAILED: {
      return state;
    }

    case types.DESTROY_ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload,
        },
      };
    }

    default:
      return state;
  }
}
