import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";

class Product extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     product: [],
  //     loading: true,
  //     error: null,
  //   };
  //   this.handleUnassign = this.handleUnassign.bind(this);
  // }

  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
  }

  render() {
    // o: better to use nullish coalescing here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
    const product = this.props.product ?? {};
    return (
      <div id="single-product">
        <h1>{product.name}</h1>

        <img src={product.imgUrl} width={200} height={200} />
        <p>price: ${product.price}</p>
        {product.description && <p>description: {product.description}</p>}
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
