var express = require('express');
var router = express.Router();

/* GET users */
router.get('/users', (req, res) => {
    res.render('users')
})

/* GET dashboard. */
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


module.exports = router;