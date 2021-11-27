const dataFavorite = require("../models/favorites");

const getFavorites = async (req, res) => {
    const data = await dataFavorite.getAllFavoritesByUser(req.params.email);
    res.status(200).json({ favorites: data });
};

const createFavorite = async (req, res) => {
    const result = await dataFavorite.createFavorite(req.body);
    console.log(result);
    res.status(201).send("nueva oferta añadida a favoritos");
};

const deleteFavorite = async (req, res) => {
    const result = await dataFavorite.deleteFavorite(req.body.id);
    console.log(result);
    res.status(200).send("oferta eliminada de favoritos");
};

const favorites = {
    getFavorites,
    createFavorite,
    deleteFavorite
};

module.exports = favorites;
