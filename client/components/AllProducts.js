import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProductsThunk, setProducts } from '../store/products';
import { Link } from 'react-router-dom';

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
            <h2 className="title">Superpowers!</h2>
          </header>
          <div className="all-products-container">
            {products.map((product) => (
              <div className="superpower-card" key={product.id}>
                <div className="superpower-img-container">
                  {product.imgUrl && (
                    <img
                      className="superpower-img"
                      src={product.imgUrl}
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div className="card-info">
                  <div className="card-title">
                    <h4 className="superpower-title">
                      <Link
                        className="superpower-name"
                        to={`/products/${product.id}`}
                      >
                        {product.name}
                      </Link>
                    </h4>
                  </div>
                  <p className="superpower-prop">
                    {/* o: since you are doing this in more than one place you might as well create a function for it */}
                    price: ${product.price / 100}
                  </p>
                  <div className="superpower-prop">
                    {product.description && <p>{product.description}</p>}
                  </div>
                </div>
              </div>
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
    // setProducts: (products) => dispatch(setProducts(products)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
