var express = require('express');
var router = express.Router();

const controllerApi = require('../controllers/controllersApi')

/* GET users */
router.get('/users', (req, res) => {
    res.render('users')
})

/* GET dashboard. */
router.get('/dashboard/:id?', controllerApi.getOffers)


module.exports = router;