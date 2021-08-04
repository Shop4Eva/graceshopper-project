const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

// o: I have thoughts about this
const Guest = db.define('guest', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Guest;
