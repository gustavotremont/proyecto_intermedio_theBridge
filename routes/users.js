var express = require('express');
var router = express.Router();



// /* GET favorites. */
router.get('/favorites', (req, res) => {
    res.render('favorites')
})


// /* GET profile. */
router.get('/profile', (req, res) => {
    res.render('profile')
})

module.exports = router;