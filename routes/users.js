const express = require('express');
const routes = express.Router();

const favorite = require("../controllers/favorite");
const user = require("../controllers/user");

routes.get("/favorites/", favorite.getFavorite); //Muestra Favoritos del Usuario Logeado
routes.get("/profile/:email", user.getUser); //Muestra Perfil del Usuario Logeado

module.exports = routes;