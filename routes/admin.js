var express = require('express');
var router = express.Router();

const dataAdmin = require('../controllers/admin')

/* GET users */
router.get('/users',dataAdmin.getUser)

/* GET dashboard. */
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


module.exports = router;