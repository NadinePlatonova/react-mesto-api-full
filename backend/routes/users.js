const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const urlValidation = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Url не валидный');
};

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidation),
  }),
}), updateAvatar);

module.exports = router;
