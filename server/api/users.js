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
// ih: need to add gatekeeping functions before 'async' to check if cart belongs to that cart's user, otherwise this route is working
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
        if (order.userId !== user.id) {
          res.status(403).send('You are not authorized to view this cart');
        } else {
          res.json(order);
        }
        if (!order) {
          res.sendStatus(404);
        }
      } else {
        res.status(403).send('You are not authorized to view this cart');
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
        res.sendStatus(404);
      }
      res.json(pastOrders);
    } else {
      res.status(403).send('You are not authorized to view this cart');
    }
  } catch (err) {
    next(err);
  }
});
// ih: need to add gatekeeping functions before 'async' to check if cart belongs to that cart's user, otherwise this route is working
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

      // } else {
      //   res.status(403).send('You are not authorized to change this cart');
      // }
    } catch (err) {
      next(err);
    }
  }
);

router.post('/createNewCart/',
  // requireToken,
  async (req, res, next) => {
    try {
      console.log('req.body', req.body)
      const newCart = await Cart.create({
        userId: null,
        totalPrice: req.body.totalPrice,
        fulfilled: true
      });
      res.json(newCart);
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:userId/createNewCart/',
  // requireToken,
  // isLoggedIn,
  async (req, res, next) => {
    try {
      // if (req.user.dataValues.id === Number(req.params.userId)) {
      const newCart = await Cart.create();
      const user = await User.findByPk(req.params.userId);
      user.addCart(newCart);
      user.save();
      res.json(newCart);
      // } else {
      //   res.status(403).send('You are not authorized to change this cart');
      // }
    } else {
      res.status(403).send('You are not authorized to change this cart');
    }
  } catch (err) {
    next(err);
  }
});
// router.put(
//   '/createNewCart/',
//   requireToken,
//   isLoggedIn,
//   async (req, res, next) => {
//     try {
//       console.log('I GOT HERE');
//       const user = await User.findByToken(req.headers.authorization);
//       console.log('USER', req.user.dataValues.id, user.id);
//       console.log('requser', req.user);
//       if (req.user.dataValues.id === user.id) {
//         const newCart = await Cart.create();
//         const user = await User.findByPk(user.id);
//         console.log('USER HERE', user);
//         user.addCart(newCart);
//         user.save();
//         res.json(newCart);
//       } else {
//         res.status(403).send('You are not authorized to change this cart');
//       }
//     } catch (err) {
//       next(err);
//     }
//   }
// );
router.put('/addOrder/', requireToken, isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log('USER', req.user.dataValues.id, user.id);
    if (req.user.dataValues.id === user.id) {
      console.log('BODY', req.body);
      const order = await Cart.findByPk(req.body.orderId, {
        include: {
          model: Product,
        },
      });
      if (!order) {
        res.sendStatus(404);
      }
      order.fulfilled = true;
      order.save();
      res.json(order);
    } else {
      res.status(403).send('You are not authorized to view this cart');
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
      console.log('REMOVE', user.id, req.user.dataValues.id);
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
        res.status(403).send('You are not authorized to change this cart');
      }
    } catch (err) {
      next(err);
    }
  }
);
