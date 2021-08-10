import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;

  return (
    <React.Fragment>
    <div className="welcome-title">
      <h3>Welcome, {firstName ?? "Superhero"}!</h3>
    </div>
    <div className="welcome-intro">
      <p>Are you looking to improve your skillset? Shop our superpowers to become your town's next biggest hero!</p>
    </div>
    <div className="home-img">
      <img src="https://www.adazing.com/wp-content/uploads/2020/02/list-of-superpowers.jpg" />
    </div>
    </React.Fragment>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(Home);
