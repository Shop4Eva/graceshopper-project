import axios from "axios";

const SET_CHECKOUT = "SET_CHECKOUT";

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
      const { data } = //look
      dispatch(setProducts(data));
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
    default:
      return state;
  }
}
