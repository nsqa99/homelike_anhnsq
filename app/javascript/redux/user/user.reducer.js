import types from "./user.type";
import Avatar from "../../constants/images/Avatar.png";
import _ from "lodash";

const initState = {
  user: {
    avatar: Avatar,
  },
  authUser: {
    avatar: Avatar,
  },
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ONE_USER_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        user: {
          avatar: data?.avatar || state.user.avatar,
          ...data,
        },
      };
    }

    case types.GET_ONE_USER_FAILED: {
      return state;
    }

    case types.GET_ONE_USER_AUTH_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        authUser: {
          avatar: data?.avatar || state.authUser.avatar,
          ...data,
        },
      };
    }

    case types.GET_ONE_USER_AUTH_FAILED: {
      return state;
    }

    case types.FOLLOW_USER_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          follower_count: data.followed.follower_count,
          followers: [data.follower, ...state.user.followers],
        },
      };
    }

    case types.FOLLOW_USER_FAILED: {
      return state;
    }

    case types.UNFOLLOW_USER_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          follower_count: data.unfollowed.follower_count,
          followers: state.user.followers.filter(
            (flw) => flw.id !== data.unfollower.id
          ),
        },
      };
    }

    case types.UNFOLLOW_USER_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
