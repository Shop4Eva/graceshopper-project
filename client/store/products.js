import axios from 'axios';

const initialState = [];

const SET_PRODUCTS = 'SET_PRODUCTS';

// const CREATE_PRODUCT = 'CREATE_PRODUCT';
// const DELETE_PRODUCT = 'DELETE_PRODUCT';
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// const SORT_PRODUCT = 'SORT_PRODUCT';

// export const sortProducts = (sortBy) => ({
//   type: SORT_PRODUCTS,
//   sortBy,
// });

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    robots: products,
  };
};

// export const createProduct = (product) => {
//   return {
//     type: CREATE_PRODUCTS,
//     product: product,
//   };
// };

// export const deleteProduct = (product) => {
//   return {
//     type: DELETE_Product,
//     product,
//   };
// };

// export const updateProduct = (product) => {
//   return {
//     type: UPDATE_PRODUCT,
//     product,
//   };
// };

//Thunks

export const setProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
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

export const deleteProductThunk = (productId, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      dispatch(deleteProduct(data));
      history.push('/products');
    } catch (err) {
      console.log(err);
    }
  };
};

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
