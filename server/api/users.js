const router = require('express').Router();
const {
  models: { User, Cart, Product_Cart },
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

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const userCart = await Cart.findOne({
      include: {
        model: Product_Cart,
      },
      where: {
        userId: req.params.userId,
        fulfilled: false,
      },
    });
    // const cart = req.body[0];
    // const productCart = req.body[1];
    // const updatedCart = await userCart.update(cart);
    // const updatedProductCart = await userProductCart.update(productCart);
    // res.json(updatedProject);
  } catch (err) {
    next(err);
  }
});
