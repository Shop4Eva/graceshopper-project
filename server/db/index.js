//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Product_Cart = require('./models/Product_Cart');

//associations could go here!

Cart.belongsToMany(Product, { through: 'products_carts' });

Product.belongsToMany(Cart, { through: 'products_carts' });

User.hasMany(Cart);
Cart.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    Product_Cart,
  },
};
