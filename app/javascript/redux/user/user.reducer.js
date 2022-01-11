import types from "./user.type";
import Avatar from "../../constants/images/Avatar.png";
import _ from "lodash";

const initState = {
  user: {},
  authUser: {},
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
    case types.SEARCH_USER_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        listES: data,
      };
    }

    case types.SEARCH_USER_FAILED: {
      return state;
    }

    case types.FOLLOW_USER_SUCCESS: {
      const data = action.payload;
      console.log(data);
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
                following_count: displayUser.following_count + 1,
                following_users: [
                  {
                    id: data.followed.id,
                    avatar_url: data.followed.avatar_url,
                    username: data.followed.username,
                    user_full_name: data.followed.user_full_name,
                    list_follower: data.followed.follower_users,
                    list_following: data.followed.following_users,
                  },
                  ...displayUser.following_users,
                ],
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
    case types.FOLLOW_USER_ON_SEARCH_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        listES: {
          ...state.listES,
          data: state.listES.data.map((user) => {
            if (user.username === data.followed.username) {
              user.follower_count = data.followed.follower_count;
              user.list_follower = [...user.list_follower, data.follower];
            }
  
            return user;
          }),
        }
      };
    }
    case types.UNFOLLOW_USER_ON_SEARCH_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        listES: {
          ...state.listES,
          data: state.listES.data.map((user) => {
            if (user.username === data.unfollowed.username) {
              user.follower_count = data.unfollowed.follower_count;
              user.list_follower = user.list_follower.filter(
                (user_item) => user_item.username !== data.unfollower.username
              );
            }
            return user;
          }),
        },
      };
    }

    case types.FOLLOW_USER_FAILED: {
      return state;
    }

    case types.UNFOLLOW_USER_SUCCESS: {
      const data = action.payload;
      const displayUser = state.user;
      let response = state;

      if (data.unfollowed.username === displayUser.username) {
        // when visit other profile
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
        // inside own profile
        response = {
          ...state,
          user: {
            ...displayUser,
            follower_users: displayUser.follower_users.map((user) => {
              // remove follower of unfollowed one in follower tab
              if (user.username === data.unfollowed.username) {
                user.list_follower = user.list_follower.filter(
                  (flw) => flw.id !== data.unfollower.id
                );
              }

              return user;
            }),
            following_count: displayUser.following_count - 1,
            following_users: displayUser.following_users.filter(
              (flw_user) => flw_user.id !== data.unfollowed.id
            ),
          },
        };
      }

      return response;
    }

    case types.UNFOLLOW_USER_FAILED: {
      return state;
    }

    case types.DESTROY_USER_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        listES: {
          ...state.listES,
          data: state.listES.data.map((u) => {
            if (u.id === data.id) {
              return data;
            }

            return u;
          }),
        },
      };
    }

    case types.DESTROY_USER_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
