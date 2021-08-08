import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../store/checkoutCart';
import { getOrderThunk } from '../store/filteredOrders';
import { Link } from 'react-router-dom';

class LoggedInCheckout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getOrder(
      this.props.match.params.userId,
      this.props.match.params.orderId
    );
  }

  render() {
    const order = this.props.order || {};
    const products = order.products || [];
    const { firstName } = this.props;

    return (
      <div id="single-product">
        <div className="cart-title-container">
          <h3 className="cart-title">
            Thank you for your purchase, {firstName}. Here is what you ordered:{' '}
          </h3>
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
                      onClick={() => this.addItemToCart(product.id)}
                      value={product.id}
                    >
                      +
                    </button>
                    <p>Quantity: {product.product_cart.quantity}</p>
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
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    firstName: state.auth.firstName,
    order: state.filteredOrders[0],
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getOrder: (userId, orderId) => dispatch(getOrderThunk(userId, orderId)),
  };
};

export default connect(mapState, mapDispatch)(LoggedInCheckout);
