const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const cart = await Cart.create();
    cart.setUser(user);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

// IMPLEMENTATION WITH LOCAL STORAGE CART (TIER 2)
// at sign-up, await user.create and cart.create; set cart to user; if cart already exists before sign-in (local storage, in window), add that cart to this cart; cart in req.body?; otherwise create cart and connect to user

// in log-in, when someone signs up, check if they have an cart associated with the window that is not empty (redux store), maybe separate routes?
// 1. nothing in local storage, cart associated with user is empty
// 2. nothing in local storage, cart associated with user has saved items
// 3. items in local storage, cart associated with user has saved items => combine items in frontend/backend
// 4. items in local storage, cart associated with user is empty => unassociate empty cart from user and transfer user id to local storage cart OR transfer items from local storage cart to the cart associated with user
