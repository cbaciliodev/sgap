var express = require('express');
var app = express();

var validation = require('../functions/validation');
var MarcaAuto = require('../models/marca_auto');

app.get('/', (req, res) => {
    MarcaAuto.find({}).exec((err, marcaAuto) => {
        if (err) { return validation.err(res, 500, 'Error al obtener todas las marcas', err); }
        return validation.ok(res, 200, marcaAuto);
    });
});

app.post('/', (req, res) => {
    var body = req.body;

    var marcaAuto = new MarcaAuto({
        nombre: body.nombre
    });

    marcaAuto.save((err, marcaAutoDB) => {
        if (err) { return validation.err(res, 500, 'Error al insertar la marca', err); }

        return validation.ok(res, 201, marcaAutoDB);
    });

});

module.exports = app;