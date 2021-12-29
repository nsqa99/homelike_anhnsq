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
      const pagination = state.pagination;
      const newPagin = {
        total_entries: pagination.total_entries + 1,
        total_pages: Math.ceil(
          parseFloat(pagination.total_entries + 1) /
            parseFloat(pagination.page_size)
        ),
      };

      return {
        ...state,
        list: [...state.list, action.payload],
        pagination: {...state.pagination, ...newPagin}
      };
    }

    case types.DESTROY_COMMENT_SUCCESS: {
      const pagination = state.pagination;
      const newPagin = {
        total_entries: pagination.total_entries - 1,
        total_pages: Math.ceil(
          parseFloat(pagination.total_entries - 1) /
            parseFloat(pagination.page_size)
        ),
      };

      return {
        ...state,
        list: state.list.filter((comment) => !_.isEqual(comment, action.payload)),
        pagination: {...state.pagination, ...newPagin}
      };
    }

    default:
      return state;
  }
}
