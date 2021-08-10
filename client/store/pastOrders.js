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

const ADD_ORDER = 'ADD_ORDERS';
const GET_ORDERS = 'GET_ORDERS';

export const addOrder = (order) => ({
  type: ADD_ORDER,
  order,
});

export const getOrders = (cart) => ({
  type: GET_ORDERS,
  cart,
});

export const getOrdersThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/pastOrders`, getToken());
      dispatch(getOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addOrderThunk = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        '/api/users/addOrder/',
        { orderId: orderId },
        getToken()
      );
      dispatch(addOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default function pastOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case ADD_ORDER:
      return [...state, action.order];
    default:
      return state;
  }
}
