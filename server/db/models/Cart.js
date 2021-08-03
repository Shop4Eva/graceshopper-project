const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const Cart = db.define('cart', {
  productList: {
    type: Sequelize.JSONB
  }
})

module.exports = Cart;
