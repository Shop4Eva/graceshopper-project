const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const Guest = db.define('guest', {
  email: {
    validate: {
      isEmail: true
    }
  }
})

module.exports = Guest;
