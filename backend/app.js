const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
const NotFoundError = require('./errors/not-found-error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error');

const checkValidation = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation error');
};

app.use(cors);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(checkValidation),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
// eslint-disable-next-line no-unused-vars
app.use((req, res) => {
  throw new NotFoundError('Что-то пошло не так...');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
