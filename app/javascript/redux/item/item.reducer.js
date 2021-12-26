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

    case types.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case types.REMOVE_FROM_BASKET:
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        //item exist in the basket, remove it
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove item{id: ${action.id}} as it is not in the basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
}
