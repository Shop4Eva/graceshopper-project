import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../store/checkoutCart';
import {
  getCartThunk,
  addToCartThunk,
  removeFromCartThunk,
} from '../store/checkoutCart';
import { Link } from 'react-router-dom';
import LoggedInCheckoutButton from './LoggedInCheckoutButton';

class EditCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
    };
    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
  }
  async componentDidMount() {
    //how to get the user id before trying to get cart
    // if (this.props.userId) {
    await this.props.getCart(this.props.userId);
    // }
    //check to see if user is logged in
    //put user in local state
    if (this.props.userId) {
      this.setState({ userId: this.props.userId });
    }
  }

  async addItemToCart(product) {
    await this.props.addProduct(product, this.props.userId);
    if (this.props.userId) {
      await this.props.getCart(this.props.userId);
    }
  }

  async removeItemFromCart(productId) {
    await this.props.removeProduct(productId, this.props.userId);
    if (this.props.userId) {
      await this.props.getCart(this.props.userId);
    }
  }

  render() {
    // o: you can use nullish coalescing here this.props.cart ?? {}
    const cart = this.props.cart || {};
    const products = cart.products || [];
    // o: can just get this from destructuring above
    const openCartId = cart.id;

    return (
      <div id="single-product">
        <div className="cart-title-container">
          <h3 className="cart-title">Shopping Cart</h3>
        </div>

        <div>
          {products.length ? (
            <div>
              {products.map((product) => (
                <div key={product.id}>
                  <h5>{product.name}</h5>
                  <div className="cart-product-info">
                    <p>Price: ${product.price / 100}</p>

                    <button
                      type="button"
                      className="add-quantity-button"
                      onClick={() => this.addItemToCart(product)}
                      value={product.id}
                    >
                      +
                    </button>
                    <p>Quantity: {product.product_cart.quantity}</p>
                    {/* if logged in */}
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
              {/* o: since you are doing this in more than one place you might as well create a function for it */}
              <p>Total cost: ${cart.totalPrice / 100}</p>
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
          {/* o: this is still being figured out */}
          {this.state.userId && (
            <LoggedInCheckoutButton
              userId={this.state.userId}
              openCartId={openCartId}
              history={this.props.history}
            />
          )}
          {!this.state.userId &&
          <button type="button" className="place-order-button">
            <Link to={`/confirmation`}>
              <h3>Place Order</h3>
            </Link>
          </button>}
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
    addProduct: (product, userId) =>
      dispatch(addToCartThunk(product, userId, history)),
    removeProduct: (productId, userId) =>
      dispatch(removeFromCartThunk(productId, userId, history)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: (userId) => dispatch(getCartThunk(userId)),
  };
};

export default connect(mapState, mapDispatch)(EditCart);
