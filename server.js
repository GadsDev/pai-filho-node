//Pacotes .env
const {
    config
} = require('dotenv');
const {
    join
} = require('path');
const {
    ok
} = require('assert');
//###########################  CONFIG .ENV ##################################
const env = process.env.NODE_ENV || 'dev'
ok(env === 'prod' || env === 'dev', 'a env é invalida, ou dev ou prod');

const configPatch = join(__dirname, './config', `.env.${env}`);
config({
    path: configPatch
})
//###########################################################################
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const hapiCors = require('hapi-cors');

const mongoConnect = require('./src/db/mongodb/mongoConnect');
//Rotas 
const filhoRoute = require('./src/routes/filhoRoute');
const paiRoute = require('./src/routes/paiRoute');

// Criar o servidor com suas configurações
const server = Hapi.Server({
    port: process.env.PORT
});

//Função que conecta o servidor
async function connectServer() {
    // Rotas   
    server.route(filhoRoute.create());
    server.route(filhoRoute.list());

    server.route(paiRoute.list());
    server.route(paiRoute.create()); 

    // Config do Swagger
    const swaggerOptions = {
        info: {
            title: 'API-Pai-Filho',
            version: 'v1.0',
        },
        lang: 'pt',
    };
    // Plugins Hapi
    await server.register([
        hapiCors,       
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },

    ]);
    
    // Conectar o mongodb
    const statusMongo = await mongoConnect;
    console.log(`Status do MongoDB ${statusMongo}`)   
    // Iniciar o servidor
    await server.start();

    console.log('Servidor rodando na porta', server.info.port);
    return server;
};

module.exports = connectServer();