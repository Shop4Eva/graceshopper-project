import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProductsThunk } from '../store/products';
import SuperpowerCard from './SuperpowerCard';

const AllProducts = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let products = props.products ?? [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await props.setProductsThunk();
        setLoading(false);
      } catch (e) {
        console.error(e);
        setError(e.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="all-superpowers-container">
      {error ? (
        <div>Error: {error}</div>
      ) : loading ? (
        <div>Get ready. Your superpowers are on their way!</div>
      ) : (
        <React.Fragment>
          <header className="Header">
            <h2 className="all-products-title">Superpowers!</h2>
          </header>
          <div className="all-products-container">
            {products.map((product) => (
              <SuperpowerCard product={product}/>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setProductsThunk: () => dispatch(setProductsThunk()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
