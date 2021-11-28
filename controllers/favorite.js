const Favorite = require("../models/favorites");

const getFavorite = async (req, res) => {
    try {
        if(req.query.currectFavoriteId){
            const result = await Favorite.getFavorite(req.query.currectFavoriteId);
            res.status(200).json(result);
        }else if(req.query.currectUserEmail) {
            const result = await Favorite.getAllFavoritesByUser(req.query.currectUserEmail);
            res.status(200).json({ favorites: result });
        }else{
            res.status(400).json({"error":err})
        }   
    } catch (err) {
        res.status(400).json({"error":err})
    }
    
    
};

const createFavorite = async (req, res) => {
    try {
        const result = await Favorite.createFavorite(req.body);
        res.status(201).send("nueva oferta añadida a favoritos");        
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const result = await Favorite.deleteFavorite(req.body.id);
        res.status(200).send("oferta eliminada de favoritos");
    } catch (err) {
        res.status(400).json({"error":err})
    }
};

const favorites = {
    getFavorite,
    createFavorite,
    deleteFavorite
};

module.exports = favorites;
