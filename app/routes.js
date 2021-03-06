const express = require('express');

const routes = express.Router();

const authMiddlewares = require('./middlewares/auth');
const guestMiddlewares = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const categoryController = require('./controllers/categoryController');
const snippetController = require('./controllers/snippetController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

/**
 * Auth
 */
routes.get('/', guestMiddlewares, authController.sigin);
routes.get('/sigup', guestMiddlewares, authController.sigup);
routes.get('/sigout', authController.sigout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * Dashboard
 */
routes.use('/app', authMiddlewares);
routes.get('/app/dashboard', dashboardController.index);

/**
 * Categoria
 */
routes.get('/app/categories/:id', categoryController.show);
routes.post('/app/categories/create', categoryController.store);

/**
 * Snippets
 */
routes.get('/app/categories/:categoryId/snippets/:id', snippetController.show);
routes.post('/app/categories/:categoryId/snippets/create', snippetController.store);
routes.put('/app/categories/:categoryId/snippets/:id', snippetController.update);
routes.delete('/app/categories/:categoryId/snippets/:id', snippetController.destroy);

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
