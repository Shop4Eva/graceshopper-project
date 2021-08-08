/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios';

// const initialState = {
//   filteredOrders: [],
//   numOrderFilters: 0,
//   OrderFilters: {},
// };

const initialState = [];

const GET_ORDER = 'GET_ORDER';

export const getOrder = (order) => ({
  type: GET_ORDER,
  order,
});

export const getOrderThunk = (userId, orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/${userId}/pastSingleOrder/${orderId}`
      );
      console.log(data, 'ORDER IN REDUX');
      dispatch(getOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// const SET_ORDER_FILTERS = 'SET_FILTERS';

// export const setRobotFilters = (filters, robots) => ({
//   type: SET_ROBOT_FILTERS,
//   filters,
//   robots,
// });

export default function filteredOrderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      console.log(action.order, 'ORDER IN REDUX1');
      return [...state, action.order];
    default:
      return state;
  }
}
