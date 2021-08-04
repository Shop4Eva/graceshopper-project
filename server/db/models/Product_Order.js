const Sequelize = require('sequelize')
const db = require('../db')

const Product_Order = db.define('product_order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Product_Order;
