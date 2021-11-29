const express = require('express');
const routes = express.Router();

/* GET home page. */
routes.get('/', (req, res) => {
    res.render('home')
})

// /* GET signup. */
routes.get('/signup', (req, res) => {
    res.render('signup')
})

// /* GET login. */
routes.get('/login', (req, res) => {
    res.render('login')
})

module.exports = routes;