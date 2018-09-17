const express = require("express");

const routes = express.Router();

const authController = require("./controllers/authController");

routes.get("/", authController.sigin);
routes.get("/sigup", authController.sigup);

module.exports = routes;
