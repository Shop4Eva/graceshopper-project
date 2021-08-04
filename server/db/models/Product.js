const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');


const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // o: let's 🌮 bout price
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    defaultValue: 1.99
  },
  // o: neither of these need long text
  imgUrl: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
})

module.exports = Product;
