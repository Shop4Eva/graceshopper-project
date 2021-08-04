const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  productList: {
    type: Sequelize.JSONB
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order;
