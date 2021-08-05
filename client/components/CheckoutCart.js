import React from 'react'
import ReactDOM from 'react-dom';
import App from '../App';
import {connect} from 'react-redux'

class CheckoutCart extends React.Component {
  // async componentDidMount() {
  //   await this.props.getProduct(this.props.match.params.id);
  // }

  render() {
    const product = this.props.product ?? {};

    return (
      <div id="single-product">
        <div className="cart-title-container">
          <h3 className="cart-title">Shopping Cart</h3>
        </div>
        <h1>{product.name}</h1>
        <img src={product.imgUrl}  />
        <div className="cart-product-info">
          <p>Price: ${product.price/100}</p>
          {/* double check if works!!!! */}
          <button type="button" className="add-quantity-button" onClick={product.quantity++}>+</button>
            <p>Quantity: {product.quantity}</p>
          <button type="button" className="remove-quantity-button" onClick={product.quantity--}>-</button>
          <button type="button" className="remove-button" onClick={deleteItem()}>remove item</button>
        </div>
        <div>
        <button type="button" className="continue-shopping-button" >
          <Link to={`/products`}>
            <h3>Continue Shopping</h3>
          </Link>
        </button>
        <button type="button" className="checkout-button" onClick={() => this.props.deleteItem(product.id)}>Checkout</button>
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {

  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(CheckoutCart);
