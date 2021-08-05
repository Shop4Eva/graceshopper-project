import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';
const DELETE_ITEM = 'DELETE_ITEM'

export const addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

export const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const _deleteItem = (productID) => {
  return {
    type: DELETE_ITEM,
    productID
  }
}

export const getCartThunk = (auth) => {
  return async (dispatch) => {
    try {
      if (!auth.id) {
        //get cart from localStorage
      } else {
        //getCart from back end
      }
      dispatch(getCart(cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCartThunk = (product, userId) => {
  return async (dispatch) => {
    try {
      //if guest
      if (!userId) {
        const currentCart = localStorage.getItem('guestCart');
        //currentCart is a string
        if (currentCart === null) {
         currentCart === []
        }
        //
        JSON.parse(currentCart).push(product);
        localStorage.setItem("guestCart", JSON.stringify(currentCart));
        //else logged in user
      } else {
        //dispatch to logged-in thunk
      }
    } catch (err) {
      console.log(err);
    }
  };
};

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

export const deleteItem = (product) => {
  return async (dispatch) => {
    try {
      if (!cart.userId) {
        localStorage.removeItem("product")
      }
      else {
      //dispatch to logged-in thunk
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};
//create a reducer to look in local store list of productIDs in cart

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return action.cart;
    default:
      return state;
  }
}
