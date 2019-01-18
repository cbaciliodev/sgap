var express = require('express');
var app = express();

var validation = require('../functions/validation');
var Modelo = require('../models/modelo');

// Rutas
app.get('/all/:query', (req, res, nex) => {

    var query = req.params.query;
    var regex = new RegExp(query, 'i');

    Promise.all([
            allModelos(regex)
            // ,allMarcas(regex)
        ])
        .then(dataArray => {
            return validation.ok(res, 200, dataArray);
        });
});

function allModelos(regex) {
    return new Promise((resolve, reject) => {
        Modelo.find({ nombre: regex }, (err, modelos) => {
            if (err) {
                reject(err);
            }
            resolve(modelos);
        });
    });
}

// function allMarcas(regex) {
//     return new Promise((resolve, reject) => {
//         Marca.find({ nombre: regex }, (err, marcas) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(marcas);
//         });
//     });
// }

module.exports = app;