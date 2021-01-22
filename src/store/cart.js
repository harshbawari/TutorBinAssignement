import * as actionTypes from './actions/actionTypes';

export const cartReducer = (state = {
  cartItems: []
}, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
      break;

    default: return state;
  }
}