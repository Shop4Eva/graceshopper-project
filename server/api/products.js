const router = require('express').Router();
const {
  models: { Product },
} = require('../db');
module.exports = router;
const {
  requireToken,
  isLoggedIn,
  isAdmin,
} = require('./gatekeepingMiddleware');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.sendStatus(404);
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:id',
  requireToken,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        next({ status: 404 });
      }
      const updatedProduct = await product.update(req.body);
      res.status(200).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/', requireToken, isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:id',
  requireToken,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        next({ status: 403 });
      }
      await product.destroy();
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);
