import types from "./item.type";
import _ from "lodash";

const initState = {
  list: {},
  item: {},
  listNotES: {},
};

export default function itemReducer(state = initState, action) {
  switch (action.type) {
    case types.GET_ALL_ITEM_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case types.GET_ALL_ITEM_FAILED: {
      return state;
    }

    case types.GET_ALL_ITEM_BY_USERNAME_SUCCESS: {
      return { ...state, listNotES: action.payload };
    }

    case types.GET_ALL_ITEM_BY_USERNAME_FAILED: {
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

    case types.RESET_ITEM_STATE_SUCCESS: {
      return { ...state, item: {} };
    }

    case types.CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        listNotES: {
          ...state.listNotES,
          data: [action.payload, ...state.listNotES.data],
        },
      };
    }

    case types.CREATE_ITEM_FAILED: {
      return state;
    }

    case types.DESTROY_ITEM_SUCCESS: {
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
          data: state.list.data?.filter((item) => item.id !== data.id),
          pagination: { ...state.list.pagination, ...newPagin },
        },

        listNotES: {
          ...state.listNotES,
          data: state.listNotES.data?.filter((item) => item.id !== data.id),
          pagination: { ...state.listNotES.pagination, ...newPagin },
        },
        isSearch: isSearch
      };

      return {
        ...state,
        ...newData,
      };
    }

    case types.DESTROY_ITEM_FAILED: {
      return state;
    }

    case types.UPDATE_ITEM_SUCCESS: {
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

    case types.UPDATE_ITEM_FAILED: {
      return state;
    }

    default:
      return state;
  }
}
