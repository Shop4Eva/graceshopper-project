import React from 'react'
import {connect} from 'react-redux'
import { getCartThunk } from '../store/checkoutCart';
import { Link } from 'react-router-dom';

class Confirmation extends React.Component {
  async componentDidMount() {
    console.log(this.props.auth)
    await this.props.getCart(this.props.auth.userId)
  }

  render() {
    if (!this.props.cart.products) {
      return <h1>Loading</h1>
    }
    const user = this.props.auth;
    const cart = this.props.cart;
    const products = cart.products

    console.log("Cart", JSON.stringify(cart))

    return (
      <div id="checkout-wrapper">
        <div className="cart-title-container">
          <h1 className="cart-title">Congratulations, {user.firstName ?? "Superhero"}! Your Order Has Been Placed!</h1>
        </div>
        <div>
          <p className="shipping-info">Order will be shipped to: {'fake address goes here'}</p>
        </div>
        <h3>Order Details: </h3>
        <div className="cart-product-info">
          {products.map((product) => (
            <div key={product.id}>
              <h5>{product.name}</h5>
              <img src={product.imgUrl} width={200} height={200}/>
              <p>Price: ${product.price / 100}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
        </div>
        <div>
          <p>Cart total: {cart.totalPrice/100}</p>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    auth: state.auth,
    cart: state.cart
    // product: state.
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId) => dispatch(getCartThunk(userId))
  };
};

export default connect(mapState, mapDispatch)(Confirmation);

