/****************** Nodejs Dependencies ******************/
const express = require('express')
const logger = require('morgan');

/****************** Project Dependencies ******************/
const errors = require('./middlewares/errors');

/****************** Lanza la BBDD de Mongo ******************/
require('./utils/dbMongo') 
require('dotenv').config() // carga fichero variables de entorno


/****************** Import routes ******************/

const indexRoutes = require('./routes/index');
const usersRotes = require('./routes/users')
const adminRotes = require('./routes/admin')
const ApiRoutes = require('./routes/routeApi')

/****************** Enable Express ******************/
const app = express()
const port = 3000

/****************** Express Settings ******************/
app.use(express.json()); //Para habilitar envio de JSON al servidor
app.use(express.static('public')); //Habilitar los archivos para que sean estaticos
app.use(express.urlencoded( { extended: false } )); //Habilita la lectura del body por metodo post
app.use(logger('dev')) // habilitar Morgan con preset dev

/****************** Enable Pug ******************/
app.set('view engine', 'pug');
app.set('views','./views');



/****************** Routes ******************/
app.use('/', indexRoutes);
app.use('/', usersRotes);
app.use('/', adminRotes);
app.use('/', ApiRoutes);

//Capture All 404 errors
app.use( errors.error404);

/****************** Actice Server ******************/
const server = app.listen(port, () => {
    console.log(`ServerOn http://localhost:${port}`)
})

module.exports = server;