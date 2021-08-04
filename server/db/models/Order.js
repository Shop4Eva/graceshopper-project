const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const Order = db.define('order', {
  // o: why JSONB???
  productList: {
    type: Sequelize.JSONB
  },
  // o: why do you have the price here?
  totalPrice: {
    type: Sequelize.DECIMAL(10,2)
  }
})

module.exports = Order;
