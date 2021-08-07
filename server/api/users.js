const router = require('express').Router();
const {
  models: { User, Cart, Product, Product_Cart },
} = require('../db');
const {
  requireToken,
  isLoggedIn,
  isAdmin,
} = require('./gatekeepingMiddleware');
module.exports = router;

router.get('/', requireToken, isLoggedIn, isAdmin, async (req, res, next) => {
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

// ih: need to add gatekeeping functions before 'async' to check if cart belongs to that cart's user, otherwise this route is working
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      include: {
        model: Product,
      },
      where: {
        userId: req.params.userId,
      },
    });
    if (!cart) {
      res.sendStatus(404);
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// ih: need to add gatekeeping functions before 'async' to check if cart belongs to that cart's user, otherwise this route is working
router.put('/:userId/addtocart/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        fulfilled: false,
      },
    });

    await cart.addProduct(product);

    const productInCart = await Product_Cart.findOne({
      include: [Cart],
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });

    productInCart.quantity++;
    productInCart.subtotalPrice = product.price * productInCart.quantity;
    cart.totalPrice += product.price;

    productInCart.save();
    cart.save();

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/:userId/removefromcart/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);

    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        fulfilled: false,
      },
    });

    const productInCart = await Product_Cart.findOne({
      include: [Cart],
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });

    productInCart.quantity--;
    productInCart.subtotalPrice = product.price * productInCart.quantity;
    if (!productInCart.quantity) {
      await cart.removeProduct(product);
    }
    cart.totalPrice -= product.price;

    productInCart.save();
    cart.save();

    res.json(cart);
  } catch (err) {
    next(err);
  }
});
