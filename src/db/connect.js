const mongoose = require('mongoose');
const connectString = process.env.MONGODB_URL;

async function connectMongo() {
     // Status de conexões MongoDB
     const STATUS = {
        0: "Disconectado",
        1: "Conectado",
        2: "Conectando",
        3: "Disconectado"
    };
   // Chamada da string de conexão do mongoose
    const db = await mongoose.connect(connectString, { useNewUrlParser: true});
    // Pega o STATUS da conexão
    const conectStatus = db.connection._readyState;
    
    return STATUS[conectStatus];
}

module.exports = connectMongo();