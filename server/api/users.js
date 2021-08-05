const router = require('express').Router();
const {
  models: { User, Cart, Product, Product_Cart },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      include: {
        model: Product
      },
      where: {
        userId: req.params.userId
      }
    });
    if (!cart) {
      res.sendStatus(404);
    }
    console.log('cart route', cart)
    res.json(cart);
  } catch (err) {
    next(err)
  }
});

router.put('/:userId/addtocart', async (req, res, next) => {
  try {
    const oldCart = req.body.cart;
    const cart = await Cart.findByPk(oldCart.id);

    console.log('magic methods', Object.keys(cart.__proto__))
    const product = req.body.product;
    cart.totalPrice += product.price;
    await cart.addProduct(product);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
