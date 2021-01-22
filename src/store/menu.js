import * as actionTypes from './actions/actionTypes';

export const menuReducer = (state = {
  menuItems: []
}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MENU:
      return {
        ...state,
        menuItems: action.payload
      }
      break;

    case actionTypes.ADD_ITEM:
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload]
      }
      break;

    default: return state;
  }
}