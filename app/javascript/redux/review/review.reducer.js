import types from "./review.type";
import _ from "lodash";

const initState = {
  list: [],
  pagination: {},
};

export default function reviewReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_REVIEW_SUCCESS: {
      const {data, pagination} = action.payload
      return {
        ...state,
        list: data,
        pagination: pagination,
      };
    }

    case types.GET_ALL_REVIEW_FAILED: {
      return state;
    }

    case types.CREATE_REVIEW_SUCCESS: {
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
        pagination: {...pagination, ...newPagin}
      };
    }

    case types.DESTROY_REVIEW_SUCCESS: {
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
        list: state.list.filter((review) => !_.isEqual(review, action.payload)),
        pagination: {...pagination, ...newPagin}
      };
    }

    default:
      return state;
  }
}
