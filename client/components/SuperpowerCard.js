import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils';

class SuperpowerCard extends React.Component {
  render() {
    const product = this.props.product;
    return <div className="superpower-card" key={product.id}>
                <div className="superpower-img-container">
                  {product.imgUrl && (
                    <img
                      className="superpower-img"
                      src={product.imgUrl}
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <div className="card-info">
                  <div className="card-title">
                    <h4 className="superpower-title">
                      <Link
                        className="superpower-name"
                        to={`/products/${product.id}`}
                      >
                        {product.name}
                      </Link>
                    </h4>
                  </div>
                  <p className="superpower-prop">
                    price: ${formatPrice(product.price)}
                  </p>
                  <div className="superpower-prop">
                    {product.description && <p>{product.description}</p>}
                  </div>
                </div>
              </div>;
  }
}

export default SuperpowerCard;
