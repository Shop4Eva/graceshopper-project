//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Product_Cart = require('./models/Product_Cart');

//associations could go here!

// now can access product_cart in db
// Product.hasMany(Product_Cart);
// Product_Cart.belongsTo(Product);

Cart.hasMany(Product_Cart);
Product_Cart.belongsTo(Cart);

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
