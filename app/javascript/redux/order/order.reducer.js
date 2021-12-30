import types from "./order.type";
import _ from "lodash";

const initState = {
  list: [],
  order: {},
};

export default function orderReducer(state = initState, action) {
  switch (action.type) {
    // case types.GET_ALL_ORDER_SUCCESS: {
    //   const {data, pagination} = action.payload
    //   return {
    //     ...state,
    //     list: data,
    //     pagination: pagination,
    //   };
    // }

    // case types.GET_ALL_ORDER_FAILED: {
    //   return state;
    // }

    case types.CREATE_ORDER_SUCCESS: {
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
        order: {
          ...state.order,
          ...action.payload,
        },
      };
    }

    case types.CREATE_ONE_ORDER_FAILED: {
      return state;
    }

    case types.GET_ONE_ORDER_FAILED: {
      return state;
    }
    
    case types.GET_ONE_BY_ITEM_ORDER_FAILED: {
      return state;
    }

    // case types.DESTROY_ORDER_SUCCESS: {
    //   const pagination = state.pagination;
    //   const newPagin = {
    //     total_entries: pagination.total_entries - 1,
    //     total_pages: Math.ceil(
    //       parseFloat(pagination.total_entries - 1) /
    //         parseFloat(pagination.page_size)
    //     ),
    //   };

    //   return {
    //     ...state,
    //     list: state.list.filter((ORDER) => !_.isEqual(ORDER, action.payload)),
    //     pagination: {...pagination, ...newPagin}
    //   };
    // }

    default:
      return state;
  }
}