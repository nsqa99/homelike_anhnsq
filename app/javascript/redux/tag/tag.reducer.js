import types from "./tag.type";
import _ from "lodash";

const initState = {
};

export default function tagReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_TAG_SUCCESS: {
      const {data} = action.payload
      return {
        ...state,
        list: data
      };
    }

    case types.GET_ALL_TAG_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
