import * as actionTypes from './actionTypes';


export const create_menu = (menu) => dispatch => {

  const menuArray = Object.values(menu);

  return dispatch(post_menu(menuArray));
}

export const post_menu = (menu) => ({
  type: actionTypes.CREATE_MENU,
  payload: menu
});

export const add_item_to_cart = (item) => dispatch => {
  return dispatch(post_item_to_cart(item));
}

export const post_item_to_cart = (item) => ({
  type: actionTypes.ADD_ITEM,
  payload: item
});

export const increment_quantity = (itemname, quantity) => dispatch => {
  return dispatch(post_increment_quantity(itemname, quantity));
}

export const post_increment_quantity = (itemname, quantity) => ({
  type: actionTypes.INCREMENT,
  payload: {
    name: itemname,
    quantity: quantity
  }
});

export const decrement_quantity = (itemname, quantity) => dispatch => {
  return dispatch(post_decrement_quantity(itemname, quantity));
}

export const post_decrement_quantity = (itemname, quantity) => ({
  type: actionTypes.DECREMENT,
  payload: {
    name: itemname,
    quantity: quantity
  }
});

export const clear_cart = () => dispatch => {
  return dispatch(post_clear_cart());
}

export const post_clear_cart = () => ({
  type: actionTypes.CLEAR_CART,
  payload: null
});