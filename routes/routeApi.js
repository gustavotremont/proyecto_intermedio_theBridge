const express = require('express');
const controllerApi = require('../controllers/controllersApi');
const routes = express.Router();


//********************RUTAS POST *****************/
//ruta para registrarse en la app
routes.post('/api/user', (req, res) => {
    res.json({
        "email": "mm@gmail.com",
        "password": "123456",
        "Nombre":"Maria",
        "Apellidos":"Garcia",
        "cv":"curriculum"
    })
})
//Ruta para login
routes.post('/api/login', (req, res) => {
    res.json({
        "email": "mm@gmail.com",
        "password": "123456"
    })
})
//Ruta para logout
routes.post('/api/logout', (req, res) => {
    res.json({
        "email": "mm@gmail.com",
        "password": "123456"
    })
})

//Crear una oferta de trabajo
routes.post('/api/ads', controllerApi.creaOferta)

//Ruta para favoritos
routes.post('/api/favorites', (req, res) => {
    res.json({
        
    })
})

/************************ RUTAS PUT ******** ************/
// Editar datos del perfil de usuario
routes.put('/api/user', (req, res) => {
    res.json({
        "email": "mm@gmail.com",
        "password": "123456"
        
    })
})

//Editar datos de una oferta de trabajo 
routes.put('/api/ads', (req, res) => {
    res.json({
        "Puesto": "Developer",
        "Nombre_empresa": " CES",
        "Localizacion": "Madrid",
        "Requisitos": " javascript",
        "Descripcion": "L a V 9 A 15h pm",
        
    })
})

/******************** RUTAS DELETE ************************/
//// Borrar a un usuario de la base de datos(admin)
routes.delete('/api/user/', (req, res) => { //?? en el ejericcio piden /api/user/ads ??
    res.json({
        "email": "mm@gmail.com",
        "password": "123456",
        "Nombre":"Maria",
        "Apellidos":"Garcia",
        "cv":"curriculum"
        
    })
})

//Borrar oferta de trabajo
routes.delete('/api/ads', (req, res) => {
    res.json({
        "Puesto": "Developer",
        "Nombre_empresa": " CES",
        "Localizacion": "Madrid",
        "Requisitos": " javascript",
        "Descripcion": "L a V 9 A 15h pm",
        
    })
})

//Borrar favoritos
routes.delete('/api/favorites', (req, res) => {
    res.json({
        
    })
})


/* **************** RUTAS PARA GET  *******************/
//Ruta para Listado de resultados de la busqueda
routes.get('/api/search', (req, res) => {
    res.json({
        "Puesto": "Developer",
        "Requisitos": " javascript",
        "Descripcion": "L a V 9 A 15h pm",
        
    })
})


module.exports = routes;