const express = require('express');
const routes = express.Router();

const user = require('../controllers/user')
const offer = require("../controllers/offer");

routes.get("/user/:action?", user.getUser); //Mostrar Lista de Usuarios
routes.get('/dashboard/:action?', offer.getOffers)

module.exports = routes;