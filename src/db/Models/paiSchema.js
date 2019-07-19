const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// tamanhos e sabores variados,

const Pai = new Schema({    
    nome: {
        type: String,       
        required: true,
    }, 
    nascimento: {
        type: String,       
        required: true,
    },   
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Pai', Pai);