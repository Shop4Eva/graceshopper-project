import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartThunk } from '../store/user';

class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: {},
      total: 0,
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    if (this.props.isLoggedIn) {
      console.log('before', this.state);
      const productList = this.props.auth.cart.productList;
      const numProduct = !productList[this.props.productId]
        ? 1
        : productList[this.props.productId] + 1;
      this.setState({
        productList: productList || {},
        total: this.props.auth.cart.total || 0,
      });
      this.setState({
        productList: { ...productList, productId: numProduct },
        total: this.props.price,
      });
      console.log('after', this.state);
      console.log('hi, auth', this.props.auth);
    } else {
      console.log('not auth', this.props.auth);
    }
  }

  render() {
    const { addToCart } = this;

    return (
      <div>
        <button type="button" className="addToCart" onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addToCartThunk: (userId, productId) =>
      dispatch(addToCartThunk(userId, productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
