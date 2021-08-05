const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Cart;
