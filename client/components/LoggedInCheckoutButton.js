import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewCartThunk, getCartThunk } from '../store/checkoutCart';
import { addOrderThunk } from '../store/pastOrders';

class LoggedInCheckoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.checkout = this.checkout.bind(this);
  }

  async checkout() {
    await this.props.addOrder(this.props.userId, this.props.openCartId);
    console.log('CARTID', this.props.openCartId);
    this.props.history.push(`/checkout/${this.props.openCartId}/`);
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

const mapDispatch = (dispatch, { history }) => {
  return {
    addOrder: (userId, orderId) => dispatch(addOrderThunk(userId, orderId)),
    createNewCart: (userId) => dispatch(createNewCartThunk(userId)),
  };
};

export default connect(null, mapDispatch)(LoggedInCheckoutButton);
