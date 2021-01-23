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

    case actionTypes.INCREMENT:

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          if (cartItem.name === action.payload.name) {
            return {
              name: cartItem.name,
              price: cartItem.price,
              instock: cartItem.instock,
              quantity: cartItem.quantity + action.payload.quantity
            }
          } else {
            return cartItem
          }
        })
      }

    case actionTypes.DECREMENT:

      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => {
          if (cartItem.name === action.payload.name && cartItem.quantity > 1)
            return true;
          else
            return false;
        }).map((cartItem) => {
          if (cartItem.name === action.payload.name) {
            return {
              name: cartItem.name,
              price: cartItem.price,
              instock: cartItem.instock,
              quantity: cartItem.quantity - action.payload.quantity
            }
          } else {
            return cartItem
          }
        })
      }


    default: return state;
  }
}