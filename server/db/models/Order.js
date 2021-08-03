const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const Order = db.define('order', {
  productList: {
    type: Sequelize.JSONB
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10,2)
  }
})

module.exports = Order;
