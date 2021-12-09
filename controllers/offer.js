const jwt = require('jsonwebtoken')
const Offer = require('../models/offer');


const createOffer = async (req,res) => {
    try{
        const {title, companyName, description, salary, location, URL} = req.body;
        let errors = [];

        if(!title || !companyName || !description || !salary || !location || !URL ) {
            errors.push({msg : "Completa todos los campos"})
            
        } else { 
            const offer = new Offer(req.body); // Genero el nuevo documento
            const result = await offer.save(); // Lo guarda en BBDD
            res.status(201).redirect('/dashboard');       
   
       }       
    } catch(err){
        res.status(400).redirect('/')
    }  
}

// res.redirect('/dashboard/?currectOfferId=asdasdasd')
const getOffers = async (req, res) => {
    try{   
        let role = '';
        if(req.cookies.access_token){
            const token = jwt.verify(req.cookies.access_token, process.env.JWT_SECRET);
            role = token.role;
        } 
        if (req.params.action === 'create') {
            res.status(200).render('dashboardCreate',{role: role});
        } 
        
        else if(req.params.action === 'edit'){
            if(req.query.currentOfferId){
                const result = await Offer.findById(req.query.currentOfferId);
                res.status(200).render('dashboardEdit',{offer: result, role: role}) // DEBEMOS DEVOLVER OFERTA POR ID !!!!
            } else {
                res.status(400).redirect('/')
            }
        }
        
        else {
            const result = await Offer.find({}, '-__v');
            res.status(200).render('dashboard',{result: result,role: role }) // Devuelve todos las ofertas
        }
    } 
    catch(err){
        res.status(400).redirect('/')
    } 
} 

const updateOffert = async (req, res) => {
    try {
        const {title, companyName, description, salary, location, URL} = req.body;
        let errors = [];

        if(!title || !companyName || !description || !salary || !location || !URL ) {
            errors.push({msg : "Completa todos los campos"})
        }

        if (req.query.currentOfferId) {
            console.log(req.query.currentOfferId);
            let offerToEdit = await Offer.findById(req.query.currentOfferId);

            offerToEdit.title = req.body.title;
            offerToEdit.companyName = req.body.companyName;
            offerToEdit.description = req.body.description;
            offerToEdit.salary = req.body.salary;
            offerToEdit.location = req.body.location;
            offerToEdit.URL = req.body.URL;

            await offerToEdit.save();
            res.status(200).redirect('/dashboard')

        } else {
            res.status(400).redirect('/dashboard')
        } 
    }
    catch(err){
        res.status(400).redirect('/')
    }; 
};

const deleteOffert = async (req, res) => {
    try {
        if(req.query.currentOfferId) {
            let offerToDelete = await Offer.findById(req.query.currentOfferId); //primero busca la oferta
            await offerToDelete.remove();  // luego borra la oferta
            res.status(400).redirect('/dashboard')
        }else {
            res.status(400).redirect('/dashboard')
        }
    }
    catch(err){
        res.status(400).redirect('/')
    } 
}

const offers = {
    createOffer,
    getOffers,
    updateOffert,
    deleteOffert
}

module.exports = offers;