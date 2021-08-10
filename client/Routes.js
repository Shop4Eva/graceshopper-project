import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/CreateAccountForm';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import Product from './components/Product';
import { me } from './store';
import EditCart from './components/EditCart';
import LoggedInCheckout from './components/LoggedInCheckout';
import Confirmation from './components/ConfirmationPage';

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
            <Route path="/checkout/:orderId" component={LoggedInCheckout} />
            <Route path="/cart" component={EditCart} />
            {/* <Route path="/confirmation" component={Confirmation} /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/products" exact component={AllProducts} />
            <Route path="/products/:id" exact component={Product} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={EditCart} />
            <Route path="/confirmation" component={Confirmation} />
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

export default withRouter(connect(mapState, mapDispatch)(Routes));
