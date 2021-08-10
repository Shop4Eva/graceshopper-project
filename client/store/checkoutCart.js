import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';
const SET_ITEM = 'SET_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CREATE_NEW_CART = 'CREATE_NEW_CART';

export const createNewCart = (cart) => ({
  type: CREATE_NEW_CART,
  cart
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
    total += productList[i].price * productList[i].quantity
  }
  return {products: productList, totalPrice: total};
}

export const getCartThunk = (userId) => {
  return async (dispatch) => {
    try {
      console.log('hello', userId);
      if (!userId) {
        let currentCart = localStorage.getItem('guestCart');
        if (currentCart === null) {
          currentCart = [];
        }
        else {
          currentCart = JSON.parse(currentCart);
        }
        const guestCart = createGuestTotalPrice(currentCart);
        console.log('guestCart', guestCart)
        dispatch(getCart(guestCart))
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

export const addToCartThunk = (product, userId, history) => {
  return async (dispatch) => {
    // try {
    console.log('my userID is:', userId);
    //if guest
    if (!userId) {
      let currentCart = localStorage.getItem('guestCart');
      //currentCart is a string
      if (currentCart === null) {
        currentCart = [];
      }
      else {
        currentCart = JSON.parse(currentCart);
      }
      let item = currentCart.find(element => element.id === product.id);
      if (!item) {
        product.quantity = 1;
        currentCart.push(product);
      }
      else {
        item.quantity ++;
      }
      localStorage.setItem('guestCart', JSON.stringify(currentCart));
      history.push('/cart');
    //else logged in user
    } else {
      console.log('i got this far');
      //dispatch to logged-in thunk

      // ih: adjusted data to data:cart
      const { data: cart } = await axios.put(
        `/api/users/${userId}/addtocart/${product.id}`
      );
      console.log('addToCartThunk data', cart);

      // ih: changed data to cart in addToCart
      dispatch(addToCart(cart));
      history.push('/cart');
    }
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
        let currentCart = JSON.parse(localStorage.getItem('guestCart'));
        let item = currentCart.find(element => element.id === productId);
        item.quantity --;
        if (item.quantity < 1) {
          currentCart = currentCart.filter(element => element.productId !== item.productId)
        }
        localStorage.setItem('guestCart', JSON.stringify(currentCart));
        history.push('/cart');
      } else {

        //dispatch to logged-in thunk
        // ih: adjusted data to data:cart
        const { data: cart } = await axios.put(
          `/api/users/${userId}/removefromcart/${productId}`
        );
        console.log('removeFromCartThunk data', cart);
        // ih: changed data to cart in addToCart
        dispatch(removeFromCart(cart));
        history.push('/cart');
      }
    } catch (err) {
      console.log(err);
    }
    //   };
  };
};

export const createNewCartThunk = (userId) => {
  return async (dispatch) => {
    try {
      if (!userId) {
        let currentCart = JSON.parse(localStorage.getItem('guestCart'));
        const guestCart = createGuestTotalPrice(currentCart);
        console.log('guestCart price test', guestCart.totalPrice)

        const { data } = await axios.post('/api/users/createNewCart', {totalPrice: guestCart.totalPrice});
        console.log('data', data)
        dispatch(createNewCart(data));
      }
      const { data } = await axios.put(`/api/users/${userId}/createNewCart`);
      dispatch(createNewCart(data));
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
    case CREATE_NEW_CART:
      return action.cart;
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
