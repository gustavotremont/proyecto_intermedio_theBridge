const Offer = require('../models/offer');

const createOffer = async (req,res) => {
    try{
        const offer = new Offer(req.body); // Genero el nuevo documento
        const result = await offer.save(); // Lo guarda en BBDD
        res.status(201).json(offer);
    } catch(err){
        res.status(400).json({"error":err})
    }  
}
// res.redirect('/dashboard/?currectOfferId=asdasdasd')
const getOffers = async (req, res) => {
    try{

        if(req.query.currectOfferId){
            const result = await Offer.findById(req.query.currectOfferId);
            res.status(200).render('dashboard',{result:result}) // DEBEMOS DEVOLVER OFERTA POR ID !!!!
            
        } else if (req.params.action) {
            switch (req.params.action) {
                case 'create':
                    res.status(200).render('dashboard', {action: 'create'})
                    break;
                case 'update':
                    res.status(200).render('dashboard', {action: 'update'})
                    break; 
                case 'delete':
                    res.status(200).render('dashboard', {action: 'delete'})
                    break; 
            }
        } else {
            const result = await Offer.find({});
            res.status(200).render('dashboard',{result:result}) // Devuelve todos las ofertas
        }
    } 
    catch(err){
        res.status(400).json({"error":err})
    } 
} 

const updateOffert = async (req, res) => {
    try {
        let offerToEdit = await Offer.findById(req.body.id);
        offerToEdit.description = req.body.newDescription;
        const result = offerToEdit.save();
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json({"error":err});
    }; 
};

const deleteOffert = async (req, res) => {
    try {
        let offerToDelete = await Offer.findById(req.body.id); //primero busca la oferta
        const result = offerToDelete.remove();  // luego borra la oferta
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json({"error":err})
    } 
}

const offers = {
    createOffer,
    getOffers,
    updateOffert,
    deleteOffert
}

module.exports = offers;