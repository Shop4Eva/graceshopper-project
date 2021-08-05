import axios from 'axios';

const SET_CHECKOUT = 'SET_CHECKOUT';
const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';

const addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const getCartThunk = (auth) => {
  return async (dispatch) => {
    try {
      if (!auth.id) {
        //get cart from localStorage
      } else {
        //getCart from back end
        console.log('auth.id', auth.id)
        const { data } = await axios.get(`/api/users/${auth.id}/cart`);
        dispatch(getCart(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCartThunk = (product, cart) => {
  return async (dispatch) => {
    try {
      if (!cart.userId) {
        //dispatch to logged-out thunk
      } else {
        //dispatch to logged-in thunk
        const cartAndProduct = { cart, product };
        const { data } = await axios.put(`/api/users/${cart.userId}/addtocart`, cartAndProduct);
        dispatch(addToCart(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const setCheckout = (checkout) => ({
  type: SET_CHECKOUT,
  checkout,
});

export const fetchCheckout = (id) => {
  return async (dispatch) => {
    try {
      //const { data } = await axios.get(`/api/products/${id}`); WHAT IS THE AXIOS CALL TO?
      dispatch(setCheckout(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setCartProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = dispatch(setProducts(data)); //look
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};
//create a reducer to look in local store list of productIDs in cart

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHECKOUT:
      return action.checkout;
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:

      return action.cart;
    default:
      return state;
  }
}
