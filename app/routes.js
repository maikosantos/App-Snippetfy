const express = require("express");

const routes = express.Router();

const authController = require("./controllers/authController");

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("success");
  res.locals.flashError = req.flash("error");
  next();
});

routes.get("/", authController.sigin);
routes.get("/sigup", authController.sigup);

routes.post("/register", authController.register);

module.exports = routes;
