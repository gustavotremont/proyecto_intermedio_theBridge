var express = require("express");
var router = express.Router();


const controllerApi = require('../controllers/controllersApi')
const admin = require("../controllers/admin");


/* GET users */
router.get("/user/:email?", admin.getUser);
router.post("/user", admin.createUser);
router.delete("/user", admin.deleteUser);
router.put("/user", admin.updateUser);

/* GET dashboard. */
router.get('/dashboard/:id?', controllerApi.getOffers)


module.exports = router;