const express = require('express');
const passport = require('passport');
const routes = express.Router();
const auth = require('../auth/auth')

const favorite = require("../controllers/favorite");
const user = require("../controllers/user");

const passportJWTStrategy = require('../auth/passport')
passportJWTStrategy(passport); //habilita el cliente

routes.get("/favorites/", favorite.getFavorite); //Mostart Favoritos del Usuario Logeado
routes.get("/profile/:email?", passport.authenticate('jwt', {session: false}), user.getUser ); //Mostart Perfil del Usuario Logeado

// routes.get("/profile/:email", passport.authenticate('jwt', {session: false}), (req, res) => {
//     if (auth.isValidToken(req.cookies.access_token)) {
//         user.getUser
//     } else {
//         res.status(500).send('no tienes permiso para ingresar a esta pagina')
//     } 
// }); //Mostart Perfil del Usuario Logeado

module.exports = routes;