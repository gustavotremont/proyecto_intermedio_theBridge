const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken'); 

/* GET home page. */
routes.get('/', async (req, res) => {
    let role = '';
    if(req.cookies.access_token){
        const token = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
        role = token.role;
    }
    res.render('home', {role: role});
})

// /* GET signup. */
routes.get('/signup', (req, res) => {
    res.render('signup');
})

// /* GET login. */
routes.get('/login', (req, res) => {
    res.render('login');
})

module.exports = routes;