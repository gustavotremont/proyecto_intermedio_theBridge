//  ADD MODELS AND CHANGE NAME
const mongoose = require('mongoose');

const objectSchema = {
    user_id: { 
        type: Number, 
        required: true,
        unique: true
    },
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
        
    },
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const Offer = mongoose.model('Offer', productSchema);

module.exports = Offer;