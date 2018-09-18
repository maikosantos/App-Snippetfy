const express = require('express');

const routes = express.Router();

const authMiddlewares = require('./middlewares/auth');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', authController.sigin);
routes.get('/sigup', authController.sigup);
routes.get('/sigout', authController.sigout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.use('/app', authMiddlewares);
routes.get('/app/dashboard', dashboardController.index);

module.exports = routes;
