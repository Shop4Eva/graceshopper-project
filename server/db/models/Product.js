const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 199
  },
  imgUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
})

module.exports = Product;
