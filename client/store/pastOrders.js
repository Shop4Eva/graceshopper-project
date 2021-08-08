import axios from 'axios';

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

export const getOrdersThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/pastOrders`);
      dispatch(getOrders(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addOrderThunk = (userId, orderId) => {
  return async (dispatch) => {
    console.log('OrderId', orderId, userId);
    try {
      const { data } = await axios.put(
        `/api/users/${userId}/addOrder/${orderId}`
      );
      dispatch(addOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];
//create a reducer to look in local store list of productIDs in cart

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
