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
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/cart', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const [cart, created] = await Cart.findOrCreate({
        include: {
          model: Product,
        },
        where: {
          userId: user.id,
          fulfilled: false,
        },
      });
      if (created) {
        user.addCart(cart);
        user.save();
      }
      res.json(cart);
    } else {
      next({
        status: 403,
        message: 'You are not authorized to view this cart',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get(
  '/pastSingleOrder/:orderId',
  requireToken,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const user = await User.findByToken(req.headers.authorization);
      if (req.user.dataValues.id === user.id) {
        const order = await Cart.findOne({
          include: {
            model: Product,
          },
          where: {
            fulfilled: true,
            id: req.params.orderId,
          },
        });
        if (!order) {
          next({ status: 404 });
        } else if (order.userId !== user.id) {
          next({
            status: 403,
            message: 'You are not authorized to view this cart',
          });
        } else {
          res.json(order);
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

router.get('/pastOrders', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const pastOrders = await Cart.findAll({
        include: {
          model: Product,
        },
        where: {
          userId: user.id,
          fulfilled: true,
        },
      });
      if (!pastOrders) {
        next({ status: 404 });
      }
      res.json(pastOrders);
    } else {
      next({
        status: 403,
        message: 'You are not authorized to view this cart',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/addtocart/', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const product = await Product.findByPk(req.body.productId);
      const cart = await Cart.findOne({
        where: {
          userId: user.id,
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
    } else {
      next({
        status: 403,
        message: 'You are not authorized to change this cart',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/addOrder/', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (req.user.dataValues.id === user.id) {
      const order = await Cart.findByPk(req.body.orderId, {
        include: {
          model: Product,
        },
      });
      if (!order) {
        next({ status: 404 });
      }
      order.fulfilled = true;
      order.save();
      res.json(order);
    } else {
      next({
        status: 403,
        message: 'You are not authorized to view this cart',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  '/removefromcart/',
  requireToken,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const user = await User.findByToken(req.headers.authorization);
      if (req.user.dataValues.id === user.id) {
        const product = await Product.findByPk(req.body.productId);
        const cart = await Cart.findOne({
          where: {
            userId: user.id,
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
      } else {
        next({
          status: 403,
          message: 'You are not authorized to change this cart',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);
