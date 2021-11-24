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
routes.post('/api/ads', controllerApi.createOfert)

//Ruta para favoritos
routes.post('/api/favorites', controllerApi.favorites)

/************************ RUTAS PUT ******** ************/
// Editar datos del perfil de usuario
routes.put('/api/user', controllerApi.editUser)

//Editar datos de una oferta de trabajo 
routes.put('/api/ads', controllerApi.editOfert)

/******************** RUTAS DELETE ************************/
// Borrar a un usuario de la base de datos(admin)
routes.delete('/api/user/', controllerApi.deleteUser)

//Borrar oferta de trabajo
routes.delete('/api/ads', controllerApi.deleteOfert)

//Borrar favoritos
routes.delete('/api/favorites', controllerApi.deleteFavorites)

/* **************** RUTAS PARA GET  *******************/
//Ruta para Listado de resultados de la busqueda
routes.get('/api/search', controllerApi.listSearch)


module.exports = routes;