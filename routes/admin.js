var express = require("express");
var router = express.Router();

const admin = require("../controllers/admin");

/* GET users */
router.get("/user/:email?", admin.getUser);
router.post("/user", admin.createUser);
router.delete("/user", admin.deleteUser);
router.put("/user", admin.updateUser);

/* GET dashboard. */
router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

module.exports = router;