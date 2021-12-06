const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const UnauthorisedUserError = require('../errors/unauthorised-user-error');
const ConflictError = require('../errors/conflict-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorisedUserError('Пользователь не существует');

      bcrypt.compare(password, user.password, ((error, isValid) => {
        if (error) throw new ForbiddenError(error);

        if (!isValid) throw new ForbiddenError('Неправильный логин или пароль');

        if (isValid) {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
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
      }));
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
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Пользователь с указанным id не существует'));
      } else {
        next(err);
      }
    });
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
        throw new ConflictError('Пользователь с таким email уже существует');
      } else {
        next(err);
      }
    });
};

function updateUser(req, res, next) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.params.userId,
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
    req.params.userId,
    avatar,
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
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
