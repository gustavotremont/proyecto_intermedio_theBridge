const express = require('express');
const controllerApi = require('../controllers/controllersApi');
const routes = express.Router();


//********************RUTAS POST *****************/
//ruta para registrarse en la app
routes.post('/api/user', controllerApi.register)

//Ruta para login
routes.post('/api/login',controllerApi.login )
//Ruta para logout
routes.post('/api/logout', controllerApi.logout)

//Crear una oferta de trabajo
routes.post('/api/ads', controllerApi.createOffer)

/************************ RUTAS PUT ******** ************/
//Editar datos de una oferta de trabajo 
routes.put('/api/ads', controllerApi.updateOffert)

/******************** RUTAS DELETE ************************/
//Borrar oferta de trabajo
routes.delete('/api/ads', controllerApi.deleteOffert)


/* **************** RUTAS PARA GET  *******************/
//Ruta para Listado de resultados de la busqueda
// routes.get('/api/search', controllerApi.listSearch)


module.exports = routes;