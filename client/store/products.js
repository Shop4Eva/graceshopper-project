import axios from 'axios';

const initialState = [];

const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products: products,
  };
};

//Thunks

export const setProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
