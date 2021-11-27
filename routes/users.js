var express = require("express");
var router = express.Router();

const favorite = require("../controllers/favorite");
const user = require("../controllers/user");

// /* GET favorites. */
router.get("/favorites/:email", favorite.getFavorites);
router.post("/favorite", favorite.createFavorite);
router.delete("/favorite", favorite.deleteFavorite);

// /* GET profile. */
router.get("/profile/:email", user.getUserByEmail);

module.exports = router;