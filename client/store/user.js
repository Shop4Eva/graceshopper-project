import axios from 'axios';

const initialState = {};

const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (user, product) => {
  return {
    type: ADD_TO_CART,
    products: product,
  };
};

//Thunks

export const addToCartThunk = (userId, productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('/api/users/${userId}/${productId}');
      dispatch(addToCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const createProductThunk = (product, history) => {
//   return async (dispatch) => {
//     try {
//       const { data: created } = await axios.post('/api/products', product);
//       dispatch(createProduct(created));
//       history.push('/products/');
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const deleteProductThunk = (productId, history) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.delete(`/api/products/${productId}`);
//       dispatch(deleteProduct(data));
//       history.push('/products');
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const updateProductThunk = (updatedProduct, history) => {
//   return async (dispatch) => {
//     const { data } = await axios.put(
//       `/api/products/${updatedProduct.id}`,
//       updatedProduct
//     );
//     dispatch(updateProduct(data));
//     history.push(`/products/${updatedProduct.id}`);
//   };
// };

// let sortBy = '';

// //helper functions
// const sortAsc = (arr) => {
//   for (let i = 0; i < arr.length - 1; i++) {
//     let j = i + 1;
//     while (j > 0 && parseInt(arr[j][sortBy]) < parseInt(arr[j - 1][sortBy])) {
//       const temp = arr[j];
//       arr[j] = arr[j - 1];
//       arr[j - 1] = temp;
//       j--;
//     }
//   }
//   return arr;
// };

// const sortDesc = (arr) => {
//   for (let i = 0; i < arr.length - 1; i++) {
//     let j = i + 1;
//     while (j > 0 && parseInt(arr[j][sortBy]) > parseInt(arr[j - 1][sortBy])) {
//       const temp = arr[j];
//       arr[j] = arr[j - 1];
//       arr[j - 1] = temp;
//       j--;
//     }
//   }
//   return arr;
// };

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    // case CREATE_PRODUCT:
    //   return [...state, action.product];
    // case UPDATE_PRODUCT:
    //   return state.map((product) => {
    //     return product.id === action.product.id ? action.product : product;
    //   });
    // case DELETE_PRODUCT:
    //   return state.filter((product) => product.id !== action.product.id);
    // case SORT_PRODUCT:
    //   const newState = [...state];
    //   sortBy = action.sortBy === 'byId' ? 'id' : 'fuelLevel';

    //   return action.sortBy === 'byId' || action.sortBy === 'byFuelLow'
    //     ? sortAsc(newState)
    //     : sortDesc(newState);
    default:
      return state;
  }
}
