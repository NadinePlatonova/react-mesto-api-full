const jwt = require('jsonwebtoken');
const UnauthorisedUserError = require('../errors/unauthorised-user-error');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../config');

const auth = (req, res, next) => {
  if (!req.cookies.jwt) throw new UnauthorisedUserError('Необходима авторизация');

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new UnauthorisedUserError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;
