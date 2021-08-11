import React from 'react';
import { connect } from 'react-redux';
import {
  getCartThunk,
  addToCartThunk,
  removeFromCartThunk,
  createNewCartThunk,
} from '../store/checkoutCart';
import { Link } from 'react-router-dom';
import LoggedInCheckoutButton from './LoggedInCheckoutButton';
import SuperpowerCard from './SuperpowerCard';
import { formatPrice } from '../utils';
class EditCart extends React.Component {
  constructor(props) {
    super(props);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
  }
  async componentDidMount() {
    await this.props.getCart(this.props.userId);
  }
  async addItemToCart(product) {
    await this.props.addProduct(product, this.props.userId);
    await this.props.getCart(this.props.userId);
  }
  async removeItemFromCart(productId) {
    await this.props.removeProduct(productId, this.props.userId);
    await this.props.getCart(this.props.userId);
  }
  render() {
    const cart = this.props.cart ?? {};
    const products = cart.products ?? [];

    return (
      <div className="cart-wrapper">
        <div className="cart-title-container">
            <h1 className="cart-title">Shopping Cart</h1>
          </div>
        <div id="single-product">
          <div>
            {products.length ? (
              <div>
                {products.map((product, index) => (
                  <div key={index}>
                    <h5 className="cart-product-name">{product.name}</h5>
                    <div className="cart-product-info">
                      <img
                        className="superpower-img"
                        src={product.imgUrl}
                        width={200}
                        height={200}
                      />
                    <div className="details">
                      <p>Price: ${formatPrice(product.price)}</p>
                      <span className="quantity-line">
                        <p>Quantity: </p>
                        <div className="quantity-button-container">
                          <button
                            type="button"
                            className="remove-quantity-button"
                            onClick={() => this.removeItemFromCart(product.id)}
                          >
                            -
                          </button>
                          <p className="quantity-cart-info">
                            {product.quantity ?? product.product_cart.quantity}
                          </p>
                          <button
                            type="button"
                            className="add-quantity-button"
                            onClick={() => this.addItemToCart(product)}
                            value={product.id}
                          >
                            +
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                ))}
                <div className="total-price-container">
                  <p className="total-title">Total cost: </p>
                  <p className="total-price">${formatPrice(cart.totalPrice)}</p>
                </div>
              </div>
            ) : (
              <div>You have nothing in your cart</div>
            )}
          </div>
          <div>
            <button type="button" className="continue-shopping-button">
              <Link to={`/products`}>
                Continue Shopping
              </Link>
            </button>
            {this.props.userId ? (
              <LoggedInCheckoutButton
                className="place-order-button"
                userId={this.props.userId}
                cartId={cart.id}
                history={this.props.history}
              />
            ) : (
              <button
                type="button"
                className="place-order-button"
                onClick={createNewCartThunk(this.props.userId)}
              >
                <Link to={`/confirmation`}>
                  Place Order
                </Link>
              </button>
            )}
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
const mapDispatch = (dispatch, { history }) => {
  return {
    addProduct: (product, userId) => dispatch(addToCartThunk(product, userId)),
    removeProduct: (productId, userId) =>
      dispatch(removeFromCartThunk(productId, userId, history)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: (userId) => dispatch(getCartThunk(userId)),
    getGuestCart: (userId) => dispatch(createNewCartThunk(userId)),
  };
};
export default connect(mapState, mapDispatch)(EditCart);
