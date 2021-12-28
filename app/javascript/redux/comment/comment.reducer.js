import types from "./comment.type";
import _ from "lodash";

const initState = {
  list: [],
  pagination: {},
};

export default function commentReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_COMMENT_SUCCESS: {
      const {data, pagination} = action.payload
      return {
        ...state,
        list: data,
        pagination: pagination,
      };
    }

    case types.GET_ALL_COMMENT_FAILED: {
      return state;
    }

    case types.CREATE_COMMENT_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }

    case types.DESTROY_COMMENT_SUCCESS: {
      return {
        ...state,
        list: state.list.filter((comment) => !_.isEqual(comment, action.payload)),
      };
    }

    default:
      return state;
  }
}
