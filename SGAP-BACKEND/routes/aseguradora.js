var express = require('express');
var app = express();

var validation = require('../functions/validation');
var Aseguradora = require('../models/aseguradora');
var _aseguradora = require('../services/aseguradora');

var USO_VEHICULAR = require('../functions/constant').GRUPO_USO_VEHICULAR;

app.get('/', (req, res) => {
    _aseguradora.find({ usos: USO_VEHICULAR }).then(
        _data => {
            return validation.ok(res, 200, _data);
        }, err => {
            return validation.err(res, 500, 'Error al obtener todas las aseguradoras', err);
        }
    );
});

app.get('/all', (req, res) => {
    _aseguradora.find().then(
        data => validation.ok(res, 200, data),
        err => validation.err(res, 500, 'Error al obtener todas las aseguradoras', err)
    );
});

app.get('/:id', (req, res) => {

    let id = req.params.id;

    _aseguradora.findById(id).then(
        _data => {
            return validation.ok(res, 200, _data);
        }, err => {
            return validation.err(res, 500, 'Error al obtener la aseguradora', err);
        }
    );

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