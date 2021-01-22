import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './cart';
import { menuReducer } from './menu';

const rootReducer = combineReducers({
  cart: cartReducer,
  menu: menuReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);