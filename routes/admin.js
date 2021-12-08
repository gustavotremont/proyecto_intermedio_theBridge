const express = require('express');
const passport = require('passport');
const routes = express.Router();

const user = require('../controllers/user')
const offer = require("../controllers/offer");

routes.get("/user/:action?", passport.authenticate('jwt', {session: false}), user.getUser); //Mostrar Lista de Usuarios
routes.get('/dashboard/:action?', passport.authenticate('jwt', {session: false}), offer.getOffers)

module.exports = routes;