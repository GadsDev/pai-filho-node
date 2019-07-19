const boom = require('boom');
const joi = require('joi');

// Funções de CURD do MongoDB
const baseCrud = require('../db/Services/baseCrus');
// Schema da Pizza  
const paiSchema = require('../db/Models/paiSchema');

const failAction = (request, headers, erro) => {
    throw erro;
};


module.exports = {
    list() {
        return {
            path: '/pais',
            method: 'GET',
            config: {
                tags: ['Pai'],
                description: 'Deve listar pais',
                notes: 'Filtrar por nome',      
                validate: {                   
                    //query => ?skip=10&limit=0&nome=deve
                    failAction,
                    query: {
                        skip: joi.number().integer().default(0),
                        limit: joi.number().integer().default(10),                        
                    },                  
                }         
            },
            handler: (request, headers) => {
                try {
                    const { //Dados que eu quero da request
                        nome,                       
                    } = request.query //Query string                        
                    const query = nome ? {
                        nome: {
                            $regex: `.*${nome}*.`
                        } //Buscar só com uma parte do nome 
                    } : {}

                    return baseCrud.read(paiSchema,
                        nome ? query : {},
                       );

                } catch (error) {
                    console.log('Erro Interno', error);
                    return boom.internal();
                }

            }
        };
    },

    create() {
        return {
            path: '/pais',
            method: 'POST',
            config: {
                tags: ['Cliente'],
                description: 'Deve cadastrar pai',
                notes: 'Deve cadastrar com seus dados',  
                validate: {
                    failAction,
                    payload: {
                        nome: joi.string().required().min(3).max(100),
                        nascimento: joi.string().required().min(2).max(50)
                    },                   
                }             
            },
            handler: async (request) => {
                try {
                    const {
                        nome,
                        nascimento                        
                    } = request.payload; //Pegar o nome e o poder da request
                    const result = await baseCrud.create(paiSchema, {
                        nome,
                        nascimento,                                           
                    });
                    return {
                        message: 'Pai cadastrado com sucesso!',
                        _id: result._id
                    };
                } catch (error) {
                    console.log('Erro interno', error);
                    return boom.internal();
                }
            }
        };
    },
}