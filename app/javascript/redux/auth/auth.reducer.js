import types from "./auth.type";

const initState = {
  data: {
    isAuthenticated: false,
    username: "",
  },
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      return { ...state, data: action.result };
    }

    case types.LOGIN_FAILED: {
      return state;
    }
    case types.SET_CURRENT_USER: {
      return { ...state, data: { ...state.data, username: action.result } };
    }

    case types.LOGOUT: {
      return { ...state, data: initState.data }
    }

    default:
      return state;
  }
}
