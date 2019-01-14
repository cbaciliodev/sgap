var express = require('express');
var app = express();

var validation = require('../functions/validation');
var Aseguradora = require('../models/aseguradora');

app.get('/', (req, res) => {
    Aseguradora.find({}).exec((err, aseguradoras) => {
        if (err) { return validation.err(res, 500, 'Error al obtener todas las marcas', err); }
        return validation.ok(res, 200, aseguradoras);
    });
});

app.post('/', (req, res) => {
    var body = req.body;

    var aseguradoraIn = new Aseguradora({
        nombre: body.nombre,
        prima_minima: body.prima_minima,
        prima_max_gps: body.prima_max_gps,
        tasa: body.tasa
    });

    aseguradoraIn.save((err, aseguradoraDB) => {
        if (err) { return validation.err(res, 500, 'Error al insertar la aseguradora', err); }

        return validation.ok(res, 201, aseguradoraDB);
    });

});

module.exports = app;