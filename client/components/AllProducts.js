import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProductsThunk, setProducts } from '../redux/products';
import { Link } from 'react-router-dom';

const AllProjects = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let products = [];
  const { history } = this.props;

  useEffect(async () => {
    try {
      setLoading(true);
      await props.setProductsThunk();
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e.message);
      setLoading(false);
    }
  });

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : loading ? (
        <div>Get ready. Your superpowers are on their way!</div>
      ) : (
        <div>
          <header className="Header">
            <h2 className="title">Superpowers!</h2>
          </header>
          <div className="wrapper">
            {products.map((product) => (
              <div className="product" key={product.id}>
                <div className="leftBox">
                  <div className="inside">
                    <p>Superpower: </p>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <div>
                      <img src={product.imgUrl} width={200} height={200} />
                    </div>
                    <p>price: {product.price}</p>
                    {product.descrition && (
                      <p>description: {product.description}</p>
                    )}
                    {product.price && <p>price: {product.price}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    setProducts: (products) => dispatch(setProducts(products)),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
