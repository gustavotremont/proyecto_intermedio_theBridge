var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('home')
})



// /* GET signup. */
router.get('/signup', (req, res) => {
    res.render('signup')
})


// /* GET login. */
router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;