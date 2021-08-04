import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProductsThunk, setProducts } from '../store/products';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

const AllProducts = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let products = props.products || [];

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await props.setProductsThunk();
        if (mounted) {
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setError(e.message);
        setLoading(false);
      }
    };

    fetchProducts();

    return function cleanup() {
      mounted = false;
    };
  }, []);

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
                    {product.imgUrl && (
                      <div>
                        <img src={product.imgUrl} width={200} height={200} />
                      </div>
                    )}
                    <p>price: ${product.price}</p>
                    {product.description && (
                      <p>description: {product.description}</p>
                    )}
                    <AddToCart productId={product.id} />
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
    // setProducts: (products) => dispatch(setProducts(products)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
