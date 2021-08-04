import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fuelType: 'electric',
      fuelLevel: 100,
      imageUrl: 'https://www.drawize.com/drawings/images/d3024884_robot',
      missingRequiredField: '',
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    if (this.props.isLoggedIn) {
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
    createRobotThunk: (robot) => dispatch(createRobotThunk(robot, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
