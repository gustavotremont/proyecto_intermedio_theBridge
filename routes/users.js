const express = require('express');
const routes = express.Router();

const favorite = require("../controllers/favorite");
const user = require("../controllers/user");

routes.get("/favorites/", favorite.getFavorite); //Mostart Favoritos del Usuario Logeado
routes.get("/profile/:email", user.getUser); //Mostart Perfil del Usuario Logeado

module.exports = routes;