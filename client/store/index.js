import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import productsReducer from './products';
import productReducer from './singleProduct';
import checkoutReducer from './checkoutCart';
import pastOrdersReducer from './pastOrders';

const reducer = combineReducers({
  auth: auth,
  products: productsReducer,
  product: productReducer,
  cart: checkoutReducer,
  pastOrders: pastOrdersReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
