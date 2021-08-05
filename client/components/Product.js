import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { getCartThunk, addToCartThunk } from '../store/checkoutCart';
import { Link } from "react-router-dom";

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
    await this.props.getCart(this.props.auth)
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

  addItemToCart() {
    this.props.addProduct(this.props.product, this.props.cart)
  }

  render() {
    const product = this.props.product ?? {};
    console.log('cart', this.props.cart);

    return (
      <div id="single-product">
        <h1>{product.name}</h1>

        <img src={product.imgUrl} width={200} height={200} />
        <p>price: ${product.price}</p>
        {product.description && <p>description: {product.description}</p>}
        <button className="add-to-cart-button" onClick={this.addItemToCart}>Add To Cart</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    product: state.product,
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    addProduct: (product, cart) => dispatch(addToCartThunk(product, cart)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: (auth) => dispatch(getCartThunk(auth))
  };
};

export default connect(mapState, mapDispatch)(Product);
