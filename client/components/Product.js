import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';
import { getCartThunk, addToCartThunk } from '../store/checkoutCart';
import { formatPrice } from '../utils'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
    };
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async componentDidMount() {
    //how to get the user id before trying to get cart
    await this.props.getCart(this.props.userId);
    await this.props.getProduct(this.props.match.params.id);
    //check to see if user is logged in
    //put user in local state
  }

  //adding logic for local storage add to cart
  // addItemToCart(productId) {
  //   const currentCart = localStorage.getItem(loggedOutUserCart);
  //   if (currentCart == null) {
  //     currentCart === []
  //   }
  //   currentCart.push(productId);
  //   localStorage.setItem(loggedOutUserCart, currentCart);
  // }

  async addItemToCart() {
    console.log('before add', this.props.cart);
    await this.props.addProduct(this.props.product, this.props.userId);
    console.log('addItemToCart', this.props.cart);
  }

  render() {
    console.log(this.props);
    const product = this.props.product || {};

    return (
      <div id="single-product">
        <h1>{product.name}</h1>

        <img src={product.imgUrl} width={200} height={200} />
        <p>price: ${formatPrice(product.price)}</p>
        {product.description && <p>description: {product.description}</p>}

        <button className="add-to-cart-button" onClick={this.addItemToCart}>
          Add To Cart
        </button>
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
    // addProduct: (product, userId, cart) => dispatch(addToCartThunk(product, userId, cart)),
    addProduct: (product, userId) =>
      dispatch(addToCartThunk(product, userId, history)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: (userId) => dispatch(getCartThunk(userId)),
  };
};

export default connect(mapState, mapDispatch)(Product);
