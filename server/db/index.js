//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Product_Cart = require('./models/Product_Cart');

//associations could go here!

// ih: added association between Cart and Product_Cart
Cart.hasMany(Product_Cart);
Product_Cart.belongsTo(Cart);

Product.hasMany(Product_Cart);
Product_Cart.belongsTo(Product);

Cart.belongsToMany(Product, { through: Product_Cart });
Product.belongsToMany(Cart, { through: Product_Cart });

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
