import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";

class Product extends React.Component {
  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
  }
 //adding logic for local storage add to cart
  addItemToCart(productId) {
    const currentCart = localStorage.getItem(loggedOutUserCart);
    if (currentCart == null) {
      currentCart === []
    }
    currentCart.push(productId);
    localStorage.setItem(loggedOutUserCart, currentCart);
  }

  render() {
    const product = this.props.product ?? {};
    return (
      <div id="single-product">
        <h1>{product.name}</h1>

        <img src={product.imgUrl} width={200} height={200} />
        <p>price: ${product.price}</p>
        {product.description && <p>description: {product.description}</p>}
        <button className="add-to-cart-button" onclick={()=> addItemToCart(product.id)}>Add To Cart</button>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(Product);
