import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../store/checkoutCart';
import {
  getCartThunk,
  addToCartThunk,
  removeFromCartThunk,
} from '../store/checkoutCart';
import { Link } from 'react-router-dom';

class CheckoutCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
    };
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
  }
  async componentDidMount() {
    // await this.props.getProduct(this.props.match.params.id);
    await this.props.getCart(this.props.auth.userId);
  }

  deleteItem(productId) {
    console.log('TODO: Delete item ' + productId);
  }

  render() {
    // TODO: actually use the items from the cart
<<<<<<< HEAD
    const product = this.props.product ?? {
      name: 'Flight',
      imgUrl: 'fake_image_url.jpg',
      price: '1000',
      quantity: 5,
      id: 1,
    };
=======
    const product = this.props.product ?? {};
>>>>>>> confirmation page structure

    return (
      <div id="single-product">
        <div className="cart-title-container">
          <h3 className="cart-title">Shopping Cart</h3>
        </div>
        <h1>{product.name}</h1>
        <img src={product.imgUrl} />
        <div className="cart-product-info">
          <p>Price: ${product.price / 100}</p>
          {/* have to check if user is logged in or not, if not go to local storage - if yes then changes in db */}
          <button
            type="button"
            className="add-quantity-button"
            onClick={() => console.log('add quantity clicked')}
          >
            +
          </button>
          <p>Quantity: {product.quantity}</p>
          <button
            type="button"
            className="remove-quantity-button"
            onClick={() => console.log('remove quantity clicked')}
          >
            -
          </button>
          <button
            type="button"
            className="remove-button"
            onClick={() => console.log('remove button clicked')}
          >
            remove item
          </button>
        </div>
        <div>
          <button type="button" className="continue-shopping-button">
            <Link to={`/products`}>
              <h3>Continue Shopping</h3>
            </Link>
          </button>
          <button
            type="button"
            className="checkout-button"
            onClick={() => this.props.deleteItem(product.id)}
          >
            Checkout
          </button>
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
    // addProduct: (product, userId, cart) => dispatch(addToCartThunk(product, userId, cart)),
    addProduct: (productId, userId) =>
      dispatch(addToCartThunk(productId, userId)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: (userId) => dispatch(getCartThunk(userId)),
  };
};

export default connect(mapState, mapDispatch)(CheckoutCart);
