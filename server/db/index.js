//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Guest = require('./models/Guest');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

//associations could go here!

User.belongsTo(Cart);

Guest.belongsTo(Cart);

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Guest,
    Product,
    Order,
    Cart,
  },
};
