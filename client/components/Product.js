import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { getCartThunk, addToCartThunk } from '../store/checkoutCart';

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
    //check to see if user is logged in
    //put user in local state
    await this.props.getCart(this.props.auth)
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
        <button className="add-to-cart-button" onclick={()=> addToCartThunk(product.id, this.props.userId)}>Add To Cart</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    product: state.product,
    userId: state.auth.id,
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    addProduct: (product, userId, cart) => dispatch(addToCartThunk(product, userId, cart)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: (userId) => dispatch(getCartThunk(userId))
  };
};

export default connect(mapState, mapDispatch)(Product);
