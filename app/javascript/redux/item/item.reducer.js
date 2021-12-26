import types from "./item.type";
import _ from "lodash";

const initState = {
  list: [],
  item: {},
};

export default function itemReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_ITEM_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case types.GET_ALL_ITEM_FAILED: {
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

    case types.CREATE_REVIEW_SUCCESS: {
      return {
        ...state,
        item: {
          ...state.item,
          reviews: [...state.item.reviews, action.payload],
        },
      };
    }

    case types.DESTROY_REVIEW_SUCCESS: {
      return {
        ...state,
        item: {
          ...state.item,
          reviews: state.item.reviews.filter(
            (review) => !_.isEqual(review, action.payload)
          ),
        },
      };
    }

    default:
      return state;
  }
}
