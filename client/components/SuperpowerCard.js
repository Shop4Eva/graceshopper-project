import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCartThunk } from '../store/checkoutCart';
import { formatPrice } from '../utils';

class SuperpowerCard extends React.Component {
  constructor(props) {
    super(props);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async addItemToCart() {
    await this.props.addProduct(this.props.product, this.props.userId);
    this.props.history.push('/products');
  }

  render() {
    const product = this.props.product ?? {};
    return (
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
              <Link className="superpower-name" to={`/products/${product.id}`}>
                {product.name}
              </Link>
            </h4>
          </div>
          <p className="superpower-prop">
            price: ${formatPrice(product.price)}
          </p>
          <div className="superpower-prop">
            {product.description && <p>{product.description}</p>}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    userId: state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addProduct: (product, userId) => dispatch(addToCartThunk(product, userId)),
  };
};

export default SuperpowerCard;
