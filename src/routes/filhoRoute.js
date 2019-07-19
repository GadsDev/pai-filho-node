const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// tamanhos e sabores variados,

const Filho = new Schema({   
    nome: {
        type: String,       
        required: true,
    }, 
    nascimento: {
        type: String,       
        required: true,
    },   
    pai: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pai',
        required: true,             
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Filho', Filho);