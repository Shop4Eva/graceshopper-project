import React from 'react';
import { connect } from 'react-redux';
import { getOrderThunk, getOrder } from '../store/filteredOrders';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';

class LoggedInCheckout extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.getOrder(this.props.match.params.orderId);
  }

  async componentWillUnmount() {
    this.props.clearPage(this.props.match.params.orderId);
  }

  render() {
    const order = this.props.order ?? {};
    const products = order.products ?? [];
    const { firstName } = this.props;

    return (
      <div>
        <div id="single-product">
          <div id="checkout-wrapper">
            {products.length ? (
              <div>
                <div className="cart-title-container">
                  <h1 className="cart-title">
                    Congratulations, {firstName}! Your Order Has Been Placed!
                  </h1>
                </div>

                <div>
                  <p className="shipping-info">
                    Order will be shipped to: {'your secret location'}
                  </p>
                </div>

                <h3>Order Details: </h3>

                <div className="cart-product-info">
                  {products.map((product) => (
                    <div key={product.id}>
                      <h5>{product.name}</h5>
                      <img src={product.imgUrl} width={200} height={200} />
                      <p>Price: ${formatPrice(product.price)}</p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p>Cart total: {order.totalPrice / 100}</p>
                </div>
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
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userId: state.auth.id,
    firstName: state.auth.firstName,
    order: state.filteredOrders,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getOrder: (orderId) => dispatch(getOrderThunk(orderId)),
    clearPage: (orderId) => dispatch(getOrder(orderId)),
  };
};

export default connect(mapState, mapDispatch)(LoggedInCheckout);
