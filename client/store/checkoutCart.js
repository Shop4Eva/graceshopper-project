import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';
const SET_ITEM = 'SET_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

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

export const getCartThunk = (userId) => {
  return async (dispatch) => {
    try {
      console.log('hello', userId);
      if (!userId) {
        //get cart from localStorage
        // test this logic
        const currentCart = localStorage.getItem('guestCart');
        if (currentCart === null) {
          currentCart === [];
        }
      } else {
        console.log('userId', userId);
        //getCart from back end
        const { data } = await axios.get(`/api/users/${userId}/cart`);
        console.log('getCartThunk data', data);
        dispatch(getCart(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// export const addToCartThunk = (product, userId, cart) => {
export const addToCartThunk = (productId, userId, history) => {
  return async (dispatch) => {
    // try {
    console.log('my userID is:', userId);
    //if guest
    // if (!userId) {
    //   const currentCart = localStorage.getItem('guestCart');
    //   //currentCart is a string
    //   if (currentCart === null) {
    //     currentCart === [];
    //   }
    //   JSON.parse(currentCart).push(product);
    //   localStorage.setItem('guestCart', JSON.stringify(currentCart));
    //else logged in user
    // } else {
    console.log('i got this far');
    //dispatch to logged-in thunk

    // ih: adjusted data to data:cart
    const { data: cart } = await axios.put(
      `/api/users/${userId}/addtocart/${productId}`
    );
    console.log('addToCartThunk data', cart);

    // ih: changed data to cart in addToCart
    dispatch(addToCart(cart));
    history.push(`/users/${userId}/editCart`);
  };
  // } catch (err) {
  //   console.log(err);
  // }
  //   };
};

export const removeFromCartThunk = (productId, userId, history) => {
  return async (dispatch) => {
    try {
      console.log('my userID is:', userId);
      //if guest
      if (!userId) {
          const currentCart = localStorage.getItem('guestCart');
          //currentCart is a string
          if (currentCart === null) {
            currentCart === [];
          }
          JSON.parse(currentCart).push(product);
          localStorage.setItem('guestCart', JSON.stringify(currentCart));
        //else logged in user
      } else {
        //dispatch to logged-in thunk

        // ih: adjusted data to data:cart
        const { data: cart } = await axios.put(
          `/api/users/${userId}/removefromcart/${productId}`
        );
        console.log('removeFromCartThunk data', cart);

        // ih: changed data to cart in addToCart
        dispatch(removeFromCart(cart));
        history.push(`/users/${userId}/editCart`);
      }
    } catch (err) {
      console.log(err);
    }
    //   };
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
      const { data } = dispatch(_setItem(data)); //look
    } catch (err) {
      console.log(err);
    }
  };
};

// export const setItemQuantity = (productId, cartId) => {
//   return async (dispatch) => {
//     try {
//       // if (!cart.userId) {

//       // } else {
//       //   // dispatch to logged-in thunk
//       // }

//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

export const deleteItem = (product) => {
  return async (dispatch) => {
    try {
      if (!cart.userId) {
        localStorage.removeItem(product);
      } else {
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
      // ih: changed return statement
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
