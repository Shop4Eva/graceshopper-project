import axios from "axios";

const SET_PRODUCT = "SET_PRODUCT";

const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(setProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;

    default:
      return state;
  }
}
