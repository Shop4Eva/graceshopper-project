const Sequelize = require('sequelize');
const db = require('../db');


const Product_Cart = db.define('product_cart', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  subtotalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Product_Cart;
