import types from "./item.type";
import _ from "lodash";

const initState = {
  list: [],
  item: {},
  listNotES: [],
};

export default function itemReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_ITEM_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case types.GET_ALL_ITEM_FAILED: {
      return state;
    }

    case types.GET_ALL_ITEM_BY_USERNAME_SUCCESS: {
      return { ...state, listNotES: action.payload };
    }

    case types.GET_ALL_ITEM_BY_USERNAME_FAILED: {
      return state;
    }

    case types.GET_ONE_ITEM_SUCCESS: {
      return { ...state, item: action.payload };
    }

    case types.GET_ONE_ITEM_FAILED: {
      return state;
    }

    case types.SEARCH_ITEM_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case types.RESET_ITEM_STATE_SUCCESS: {
      return { ...state, item: {} };
    }

    case types.CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        listNotES: {
          ...state.listNotES,
          data: [...state.listNotES.data, action.payload],
        },
      };
    }

    case types.CREATE_ITEM_FAILED: {
      return state;
    }

    // case types.DESTROY_REVIEW_SUCCESS: {
    //   return {
    //     ...state,
    //     item: {
    //       ...state.item,
    //       reviews: state.item.reviews.filter(
    //         (review) => !_.isEqual(review, action.payload)
    //       ),
    //     },
    //   };
    // }

    default:
      return state;
  }
}
