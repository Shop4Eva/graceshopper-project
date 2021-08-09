const { models: { User, Cart }} = require('../db')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err)
  }
}

const isLoggedIn = (req, res, next) => {
  if (!req.user.id) {
    // o: you can send this to error middleware
    return res.status(403).send('You must be a logged-in user to access this page!')
  }
  else {
    next();
  }
}

// const usersCart = async (req, res, next) => {
//   try {
//     if (req.user.id !== req.cart.userId) {
//       return res.status(403).send('You can only access your own cart!')
//     }
//   } catch (err) {
//     next(err)
//   }
// }

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    // o: you can send this to error middleware
    return res.status(403).send('You shall not pass!');
  }
  else {
    next();
  }
}

module.exports = {
  requireToken,
  isLoggedIn,
  isAdmin
}
