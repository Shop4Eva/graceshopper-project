const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// o: dont need the {}
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// o: check for when the product does not exist
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});
