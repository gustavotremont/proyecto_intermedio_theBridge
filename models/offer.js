//  ADD MODELS AND CHANGE NAME
const mongoose = require('mongoose');

const objectSchema = {
    
    title: { 
        type: String, 
        required: true 
    },
    companyName: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    salary:{
        type: Number,
        required: true 
        
    },
    location:{
        type: String,
        required: true 
        
    },
    URL:{
        type: String,
        required: true 
        
    }
};
// Crear el esquema
const offerSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;