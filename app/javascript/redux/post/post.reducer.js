import types from "./post.type";
import _ from "lodash";

const initState = {
  list: {},
  listNotES: {},
  post: {}
};

export default function postReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_POST_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case types.GET_ALL_POST_FAILED: {
      return state;
    }

    case types.GET_ALL_POST_BY_USERNAME_SUCCESS: {
      return { ...state, listNotES: action.payload };
    }

    case types.GET_ALL_POST_BY_USERNAME_FAILED: {
      return state;
    }

    case types.GET_ONE_POST_SUCCESS: {
      return { ...state, post: action.payload };
    }

    case types.GET_ONE_POST_FAILED: {
      return state;
    }

    case types.SEARCH_POST_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case types.RESET_POST_STATE_SUCCESS: {
      return { ...state, post: {} };
    }

    case types.CREATE_POST_SUCCESS: {
      return {
        ...state,
        listNotES: {
          ...state.listNotES,
          data: [action.payload, ...state.listNotES.data],
        },
      };
    }

    case types.CREATE_POST_FAILED: {
      return state;
    }

    case types.DESTROY_POST_SUCCESS: {
      const { data, isSearch } = action.payload;
      const pagination = isSearch
        ? state.list.pagination
        : state.listNotES.pagination;
      const newPagin = {
        total_entries: pagination.total_entries - 1,
        total_pages: Math.ceil(
          parseFloat(pagination.total_entries - 1) /
            parseFloat(pagination.page_size)
        ),
      };
      const newData = {
        list: {
          ...state.list,
          data: state.list.data.filter((post) => post.id !== data.id),
          pagination: { ...state.list.pagination, ...newPagin },
        },

        listNotES: {
          ...state.listNotES,
          data: state.listNotES.data.filter((post) => post.id !== data.id),
          pagination: { ...state.listNotES.pagination, ...newPagin },
        },
        isSearch: isSearch
      };

      return {
        ...state,
        ...newData,
      };
    }

    case types.DESTROY_POST_FAILED: {
      return state;
    }

    case types.UPDATE_POST_SUCCESS: {
      const { data, isSearch } = action.payload;
      const pagination = isSearch
        ? state.list.pagination
        : state.listNotES.pagination;
      const newPagin = {
        total_entries: pagination.total_entries + 1,
        total_pages: Math.ceil(
          parseFloat(pagination.total_entries + 1) /
            parseFloat(pagination.page_size)
        ),
      };
      const newData = {
        list: {
          ...state.list,
          // data: [data, ...state.list.data],
          data: state.list.data?.map((elem) => {
            if (elem.id === data.id) {
              elem = data;
            }
            return elem;
          }),
          pagination: { ...state.list.pagination, ...newPagin },
        },

        listNotES: {
          ...state.listNotES,
          data: state.listNotES.data?.map((elem) => {
            if (elem.id === data.id) {
              elem = data;
            }
            return elem;
          }),
          pagination: { ...state.listNotES.pagination, ...newPagin },
        },
        isSearch: isSearch
      };

      return {
        ...state,
        ...newData,
      };
    }

    case types.UPDATE_POST_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
