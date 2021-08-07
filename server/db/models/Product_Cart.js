const Sequelize = require('sequelize');
const db = require('../db');

// ih: changed totalPrice to subtotalPrice for clarity
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
