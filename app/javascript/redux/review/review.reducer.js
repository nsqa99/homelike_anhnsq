import types from "./review.type";
import _ from "lodash";

const initState = {
  list: [],
};

export default function reviewReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_REVIEW_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case types.GET_ALL_REVIEW_FAILED: {
      return state;
    }

    case types.CREATE_REVIEW_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }

    case types.DESTROY_REVIEW_SUCCESS: {
      return {
        ...state,
        list: state.list.filter(
          (review) => !_.isEqual(review, action.payload)
        ),
      };
    }

    default:
      return state;
  }
}
