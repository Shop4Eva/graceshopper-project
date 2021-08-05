const router = require('express').Router()
const { models: { User, Order, Product_Order }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      include: {
        model: Product_Order,
      },
      where: {
        userId: req.params.userId,
        fulfilled: false,
      },
    });
    // const order = req.body[0];
    // const productOrder = req.body[1];
    // const updatedOrder = await userOrder.update(order);
    // const updatedProductOrder = await userProductOrder.update(productOrder);
    // res.json(updatedProject);
  } catch (err) {
    next(err);
  }
});
