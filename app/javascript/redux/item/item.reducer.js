import types from "./item.type";

const initState = {
  list: [],
  item: {}
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

    default:
      return state;
  }
}
