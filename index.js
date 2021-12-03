/****************** Nodejs Dependencies ******************/
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport')


/****************** Lanza la BBDD de Mongo ******************/
require('dotenv').config(); // carga fichero variables de entorno tiene que estar primero.
require('./utils/dbMongo');

/****************** Project Dependencies ******************/
const errors = require('./middlewares/errors');
// const passportJWTStrategy = require('./auth/passport')

/****************** Enable Express ******************/
const app = express();
const port = 3000;

/****************** Express Settings ******************/
app.use(express.json()); //Para habilitar envio de JSON al servidor
app.use(express.static('public')); //Habilitar los archivos para que sean estaticos
app.use(express.urlencoded( { extended: false } )); //Habilita la lectura del body por metodo post
app.use(cookieParser()); //Permite trabajar con cookies
app.use(cors()); //Inhabilita el error de CORS
app.use(logger('dev')); // habilitar Morgan con preset dev
app.use(passport.initialize());

// passportJWTStrategy(passport); //habilita el cliente

/****************** Import routes ******************/
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const ApiRoutes = require('./routes/api');

/****************** Enable Pug ******************/
app.set('view engine', 'pug');
app.set('views','./views');

/****************** Routes ******************/
app.use('/', indexRoutes);
app.use('/', usersRoutes);
app.use('/', adminRoutes);
app.use('/api', ApiRoutes);

//Capture All 404 errors
app.use(errors.error404);

/****************** Actice Server ******************/
const server = app.listen(port, () => {
    console.log(`ServerOn http://localhost:${port}`)
});