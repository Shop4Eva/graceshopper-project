//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const Product_Order = require('./models/Product_Order')

//associations could go here!

Order.belongsToMany(Product, { through: Product_Order });

Product.belongsToMany(Order, { through: Product_Order });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Product_Order,
  },
}
