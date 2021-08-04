const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

const Cart = db.define('cart', {
  productList: {
    type: Sequelize.JSONB,
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

module.exports = Cart;
