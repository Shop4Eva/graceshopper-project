import axios from 'axios';
const getToken = () => {
  const token = window.localStorage.getItem('token');
  const headers = {
    headers: {
      authorization: token,
    },
  };
  return headers;
};

const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';
const SET_ITEM = 'SET_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CREATE_NEW_CART = 'CREATE_NEW_CART';
export const createNewCart = (cart) => ({
  type: CREATE_NEW_CART,
  cart,
});
export const addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});
export const removeFromCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});
export const getCart = (cart) => ({
  type: GET_CART,
  cart,
});
export const _setItem = (productId, cartId) => {
  return {
    type: SET_ITEM,
    productId,
    cartId,
  };
};
export const _deleteItem = (product) => {
  return {
    type: DELETE_ITEM,
    product,
  };
};
const createGuestTotalPrice = (productList) => {
  let total = 0;
  for (let i = 0; i < productList.length; i++) {
    total += productList[i].price * productList[i].quantity;
  }
  return { products: productList, totalPrice: total };
};
export const getCartThunk = () => {
  return async (dispatch) => {
    try {
      if (!getToken()) {
        let currentCart = localStorage.getItem('guestCart');
        if (currentCart === null) {
          currentCart = [];
        } else {
          currentCart = JSON.parse(currentCart);
        }
        const guestCart = createGuestTotalPrice(currentCart);
        dispatch(getCart(guestCart));
      } else {
        const { data } = await axios.get(`/api/users/cart`, getToken());
        dispatch(getCart(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCartThunk = (product, history) => {
  return async (dispatch) => {
    try {
      const headers = getToken();
      if (!headers) {
        let currentCart = localStorage.getItem('guestCart');
        if (currentCart === null) {
          currentCart = [];
        } else {
          currentCart = JSON.parse(currentCart);
        }
        let item = currentCart.find((element) => element.id === product.id);
        if (!item) {
          product.quantity = 1;
          currentCart.push(product);
        } else {
          item.quantity++;
        }
        localStorage.setItem('guestCart', JSON.stringify(currentCart));
      } else {
        const { data: cart } = await axios.put(
          '/api/users/addtocart/',
          { productId: product.id },
          headers
        );
        dispatch(addToCart(cart));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const removeFromCartThunk = (productId, history) => {
  return async (dispatch) => {
    try {
      const headers = getToken();
      if (!headers) {
        let currentCart = JSON.parse(localStorage.getItem('guestCart'));
        let item = currentCart.find((element) => element.id === productId);
        item.quantity--;
        if (item.quantity < 1) {
          currentCart = currentCart.filter(
            (element) => element.productId !== item.productId
          );
        }
        localStorage.setItem('guestCart', JSON.stringify(currentCart));
        history.push('/cart');
      } else {
        const { data: cart } = await axios.put(
          '/api/users/removefromcart/',
          { productId: productId },
          headers
        );
        dispatch(removeFromCart(cart));
        history.push('/cart');
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const setCartProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = dispatch(_setItem(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};
export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_CART:
      return action.cart;
    case GET_CART:
      return action.cart;
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.cart,
      };
    default:
      return state;
  }
}
