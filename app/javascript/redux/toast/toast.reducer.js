import types from "./toast.type";
import _ from "lodash";

const initState = {
  data: {},
};

export default function toastReducer(state = initState, action) {
  switch (action.type) {
    case types.CREATE_SUCCESS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          status: 'success',
          message: data,
        },
      };
    }
    case types.CREATE_FAIL_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          status: 'fail',
          message: data,
        },
      };
    }
    case types.CREATE_LOADING_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          status: 'loading',
          message: data,
        },
      };
    }
    case types.RESET_TOAST_SUCCESS: {
      return initState;
    }

    default:
      return state;
  }
}
