// Key para Json Web Token
module.exports.SEED = 'sigap-jwt-2018';

// Estados de los módulos
module.exports.ESTADOS = {
    values: [1, 0],
    message: '{VALUE} no es un estado permitido'
};

// Estado por default
module.exports.ESTADO_ACTIVO = 1;

// Mongo atlas credentials
module.exports.MONGODB = {
    MONGODB_URI: 'mongodb+srv://sigap-4h2pt.azure.mongodb.net',
    MONGOOSE_OPTS: {
        user: 'jrupailla',
        pass: 'i2REZ2l03RhsD1Mr',
        dbName: 'sigap-db',
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }
};