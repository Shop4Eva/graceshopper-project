import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/CreateAccountForm';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import Product from './components/Product';
import { me } from './store';
import CheckoutCart from './components/CheckoutCart';
import EditCart from './components/EditCart';
import LoggedInCheckout from './components/LoggedInCheckout';
import Confirmation from './components/ConfirmationPage'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:id" exact component={Product} />
            {/* <Route path="/checkout" component={CheckoutCart} /> */}
            <Route path="/checkout/:orderId" component={LoggedInCheckout} />
            <Route path="/users/:userId/editCart" component={EditCart} />
            <Route path="/carts/:cartId/confirmation" component={Confirmation} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:id" exact component={Product} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/editCart" component={EditCart} />
            <Route path="/checkout" component={CheckoutCart} />
            <Route path="/carts/:cartId/confirmation" component={Confirmation} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
