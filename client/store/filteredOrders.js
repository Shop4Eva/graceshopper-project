/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
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
const initialState = {};
const GET_ORDER = 'GET_ORDER';
export const getOrder = (order) => ({
  type: GET_ORDER,
  order,
});
export const getOrderThunk = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/api/users/pastSingleOrder/${orderId}`,
        getToken()
      );
      dispatch(getOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function filteredOrderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default:
      return state;
  }
}
