const express = require('express');
const passport = require('passport');
const routes = express.Router();

const favorite = require("../controllers/favorite");
const user = require("../controllers/user");

const passportJWTStrategy = require('../auth/passport')
passportJWTStrategy(passport); //habilita el cliente

routes.get("/favorites/", passport.authenticate('jwt', {session: false}) ,favorite.getFavorite); //Mostart Favoritos del Usuario Logeado
routes.get("/profile/:email?/:action?", passport.authenticate('jwt', {session: false}), user.getProfile ); //Mostart Perfil del Usuario Logeado

module.exports = routes;