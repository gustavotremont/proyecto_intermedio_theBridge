const express = require('express');
const routes = express.Router();
const getRoleByToken = require('../utils/getRoleByToken')

/* GET home page. */
routes.get('/', async (req, res) => {
    const role = getRoleByToken(req.cookies.access_token);
    res.render('home', {role: role});
})

// /* GET signup. */
routes.get('/signup', (req, res) => {
    const role = getRoleByToken(req.cookies.access_token);
    res.render('signup', {role: role});
})

// /* GET login. */
routes.get('/login', (req, res) => {
    const role = getRoleByToken(req.cookies.access_token);
    res.render('login', {role: role});
})

module.exports = routes;