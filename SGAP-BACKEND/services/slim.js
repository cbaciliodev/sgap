var Slim = require('../models/slim');
var Parametro = require('../models/parametro');

var mongoose = require('mongoose');

module.exports = {
    toSlimFromBody: toSlimFromBody,
    save: save,
    list: list
}

function toSlimFromBody(body, aseguradora, riesgo, uso) {
    return new Slim({
        riesgo: riesgo,
        aseguradora: aseguradora,
        cobertura: body.codigo,
        valor: body.valor,
        uso: uso
    });
}


function save(slim) {
    return new Promise((resolve, reject) => {
        slim.save((err, slimBD) => {
            if (err) { reject(err); }
            resolve(slimBD);
        });
    });
}

function list(riesgo, aseguradora, tipo_slip) {
    return new Promise((resolve, reject) => {

        Parametro.aggregate([{
                '$match': { grupo: tipo_slip }
            },
            {
                '$lookup': {
                    'from': 'slim',
                    'let': { nombre_p: '$nombre' },
                    'pipeline': [{
                        $match: {
                            $expr: {
                                $and: [{ $eq: ['$$nombre_p', '$cobertura'] },
                                    { $eq: ['$aseguradora', mongoose.Types.ObjectId(aseguradora)] },
                                    { $eq: ['$riesgo', mongoose.Types.ObjectId(riesgo)] },
                                ]
                            }
                        }
                    }],
                    'as': 'slip'
                }
            }
        ]).exec((err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });

    });
}