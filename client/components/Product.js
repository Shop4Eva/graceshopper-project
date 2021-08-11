import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';
import { addToCartThunk } from '../store/checkoutCart';
import { formatPrice } from '../utils';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
  }
  async addItemToCart() {
    await this.props.addProduct(this.props.product, this.props.userId);
    this.props.history.push('/products');
  }

  render() {
    const product = this.props.product ?? {};

    return (
      <div className="single-product">
        <h1 className="single-product-title" >{product.name}</h1>

        <img src={product.imgUrl} width={200} height={200} />
        <p className="single-product-info">price: ${formatPrice(product.price)}</p>
        {product.description && <p className="single-product-info" >description: {product.description}</p>}

        <button className="add-to-cart-button" onClick={this.addItemToCart}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    userId: state.auth.id,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addProduct: (product, userId) => dispatch(addToCartThunk(product, userId)),
    getProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(Product);
