import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';
import { getCartThunk, addToCartThunk } from '../store/checkoutCart';
import { formatPrice } from '../utils';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
    };
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  async componentDidMount() {
    await this.props.getCart();
    await this.props.getProduct(this.props.match.params.id);
  }
  async addItemToCart() {
    console.log('before add', this.props.cart);
    await this.props.addProduct(this.props.product, this.props.userId);
    alert('Added to cart!');
    console.log('addItemToCart', this.props.cart);
    this.props.history.push('/products');
  }

  render() {
    const product = this.props.product ?? {};

    return (
      <div id="single-product">
        <h1>{product.name}</h1>

        <img src={product.imgUrl} width={200} height={200} />
        <p>price: ${formatPrice(product.price)}</p>
        {product.description && <p>description: {product.description}</p>}

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

const mapDispatch = (dispatch, { history }) => {
  return {
    addProduct: (product) => dispatch(addToCartThunk(product, history)),
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCart: () => dispatch(getCartThunk()),
  };
};

export default connect(mapState, mapDispatch)(Product);
