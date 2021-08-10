import React from 'react';
import { connect } from 'react-redux';
import {
  getCartThunk,
  addToCartThunk,
  removeFromCartThunk,
} from '../store/checkoutCart';
import { Link } from 'react-router-dom';
import LoggedInCheckoutButton from './LoggedInCheckoutButton';
import { formatPrice } from '../utils';
class EditCart extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   userId: this.props.userId,
    // };
    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
  }
  async componentDidMount() {
    await this.props.getCart();
  }
  async addItemToCart(product) {
    await this.props.addProduct(product);
    await this.props.getCart();
  }
  async removeItemFromCart(productId) {
    await this.props.removeProduct(productId);
    await this.props.getCart();
  }
  render() {
    const cart = this.props.cart || {};
    const products = cart.products || [];
    const openCartId = cart.id;
    console.log('cart: ', cart);
    return (
      <div id="single-product">
        <div className="cart-title-container">
          <h3 className="cart-title">Shopping Cart</h3>
        </div>
        <div>
          {products.length ? (
            <div>
              {products.map((product, index) => (
                <div key={index}>
                  <h5>{product.name}</h5>
                  <div className="cart-product-info">
                    <p>Price: ${formatPrice(product.price)}</p>
                    <p>
                      Quantity:{' '}
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
                    <button
                      type="button"
                      className="remove-quantity-button"
                      onClick={() => this.removeItemFromCart(product.id)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
              <p>Total cost: ${formatPrice(cart.totalPrice)}</p>
            </div>
          ) : (
            <div>You have nothing in your cart</div>
          )}
        </div>
        <div>
          <button type="button" className="continue-shopping-button">
            <Link to={`/products`}>
              <h3>Continue Shopping</h3>
            </Link>
          </button>
          {this.props.userId && (
            <LoggedInCheckoutButton
              userId={this.props.userId}
              openCartId={openCartId}
              history={this.props.history}
            />
          )}
          {!this.props.userId && (
            <button type="button" className="place-order-button">
              <Link to={`/confirmation`}>
                <h3>Place Order</h3>
              </Link>
            </button>
          )}
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
    addProduct: (product) => dispatch(addToCartThunk(product, history)),
    removeProduct: (productId) =>
      dispatch(removeFromCartThunk(productId, history)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: () => dispatch(getCartThunk()),
  };
};
export default connect(mapState, mapDispatch)(EditCart);
