import * as actionTypes from './actionTypes';


export const create_menu = (menu) => dispatch => {

  const menuArray = Object.values(menu);

  return dispatch(post_menu(menuArray));
}

export const post_menu = (menu) => ({
  type: actionTypes.CREATE_MENU,
  payload: menu
});