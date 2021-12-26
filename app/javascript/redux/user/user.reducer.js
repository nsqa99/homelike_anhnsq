import types from "./user.type";
import Avatar from "../../constants/images/Avatar.png";
import _ from 'lodash'

const initState = {
  avatar: Avatar,
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ONE_USER_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        avatar: data?.avatar || state.avatar,
        isCustomer: !!data?.customer,
        isMerchant: !!data?.merchant,
        ...data,
      };
    }

    case types.GET_ONE_USER_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
