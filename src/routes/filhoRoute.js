const boom = require('boom');
const joi = require('joi');

// Funções de CURD do MongoDB
const baseCrud = require('../db/Services/baseCrus');
// Schema da Pizza  
const filhoSchema = require('../db/Models/filhoSchema');

const failAction = (request, headers, erro) => {
    throw erro;
};


module.exports = {
    list() {
        return {
            path: '/filhos',
            method: 'GET',
            config: {
                tags: ['Filho'],
                description: 'Deve listar filhos',
                notes: 'Filtrar por nome',      
                validate: {                   
                    //query => ?skip=10&limit=0&nome=deve
                    failAction,
                    query: {
                        skip: joi.number().integer().default(0),
                        limit: joi.number().integer().default(10),
                        nome: joi.string().min(3).max(100)
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

                    return baseCrud.read(filhoSchema,
                        nome ? query : {},
                    ).populate('pai', 'nome');

                } catch (error) {
                    console.log('Erro Interno', error);
                    return boom.internal();
                }

            }
        };
    },

    create() {
        return {
            path: '/filhos',
            method: 'POST',
            config: {
                tags: ['Cliente'],
                description: 'Deve cadastrar pai',
                notes: 'Deve cadastrar com seus dados',  
                validate: {
                    failAction,
                    payload: {
                        nome: joi.string().required().min(3).max(100),
                        nascimento: joi.string().required().min(2).max(50),
                        pai: joi.string().required().min(3).max(200)
                    },                   
                }             
            },
            handler: async (request) => {
                try {
                    const {
                        nome,
                        nascimento,
                        pai                
                    } = request.payload; //Pegar o nome e o poder da request
                    const result = await baseCrud.create(filhoSchema, {
                        nome,
                        nascimento, 
                        pai                                          
                    });
                    return {
                        message: 'Filho cadastrado com sucesso!',
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