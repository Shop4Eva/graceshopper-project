import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk } from '../store/checkoutCart';
import { addOrderThunk } from '../store/pastOrders';

class LoggedInCheckoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
  }

  async checkout() {
    await this.props.addOrder(this.props.cartId);
    this.props.history.push(`/checkout/${this.props.cartId}/`);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="checkout-button"
          onClick={this.checkout}
        >
          Checkout
        </button>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addOrder: (orderId) => dispatch(addOrderThunk(orderId)),
  };
};

export default connect(null, mapDispatch)(LoggedInCheckoutButton);
