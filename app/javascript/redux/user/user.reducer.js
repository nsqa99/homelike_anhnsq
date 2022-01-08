import types from "./user.type";
import Avatar from "../../constants/images/Avatar.png";
import _ from "lodash";

const initState = {
  user: {
    avatar: Avatar,
  },
  authUser: {
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
      const displayUser = state.user;
      let response = state;
      if (data.followed.username === displayUser.username) {
        response = {
          ...state,
          user: {
            ...displayUser,
            follower_count: data.followed.follower_count,
            follower_users: [data.follower, ...displayUser.follower_users],
          },
        };
      } else {
        const insideFollower =
          displayUser.follower_users.find(
            (user) => user.username === data.followed.username
          ) != null;

        response = insideFollower
          ? {
              ...state,
              user: {
                ...displayUser,
                follower_users: displayUser.follower_users.map((user) => {
                  if (user.username === data.followed.username) {
                    user.list_follower = [data.follower, ...user.list_follower];
                  }

                  return user;
                }),
              },
            }
          : {
              ...state,
              user: {
                ...displayUser,
                following_users: displayUser.following_users.map((user) => {
                  if (user.username === data.followed.username) {
                    user.list_follower = [data.follower, ...user.list_follower];
                  }

                  return user;
                }),
              },
            };
      }

      return response;
    }

    case types.FOLLOW_USER_FAILED: {
      return state;
    }

    case types.UNFOLLOW_USER_SUCCESS: {
      const data = action.payload;
      const displayUser = state.user;
      let response = state;

      if (data.unfollowed.username === displayUser.username) {
        response = {
          ...state,
          user: {
            ...displayUser,
            follower_count: data.unfollowed.follower_count,
            follower_users: displayUser.follower_users.filter(
              (flw) => flw.id !== data.unfollower.id
            ),
          },
        };
      } else {
        const insideFollower =
          displayUser.follower_users.find(
            (user) => user.username === data.unfollowed.username
          ) != null;

        response = insideFollower
          ? {
              ...state,
              user: {
                ...displayUser,
                follower_users: displayUser.follower_users.map((user) => {
                  if (user.username === data.unfollowed.username) {
                    user.list_follower = user.list_follower.filter(
                      (flw) => {
                        return flw.id !== data.unfollower.id
                      }
                    );
                  }

                  return user;
                }),
              },
            }
          : {
              ...state,
              user: {
                ...displayUser,
                following_users: displayUser.following_users.map((user) => {
                  if (user.username === data.unfollowed.username) {
                    user.list_follower = user.list_follower.filter(
                      (flw) => flw.id !== data.unfollower.id
                    );
                  }

                  return user;
                }),
              },
            };
      }

      return response;
    }

    case types.UNFOLLOW_USER_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
