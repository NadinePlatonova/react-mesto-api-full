require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../config');

const NotFoundError = require('../errors/not-found-error');
const UnauthorisedUserError = require('../errors/unauthorised-user-error');
const ConflictError = require('../errors/conflict-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorisedUserError('Пользователь не существует');

      bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (!isValid) throw new UnauthorisedUserError('Неправильный логин или пароль');

          if (isValid) {
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
              { expiresIn: '7d' },
            );
            res
              .cookie('jwt', token, {
                maxAge: 3600000 * 24 * 7,
                httpOnly: true,
                sameSite: true,
              })
              .send({
                name: user.name, about: user.about, avatar: user.avatar, email: user.email,
              });
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

function updateUser(req, res, next) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователь с указанным id не существует'));
      } else {
        next(err);
      }
    });
}

const updateAvatar = (req, res, next) => {
  const avatar = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    avatar,
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
