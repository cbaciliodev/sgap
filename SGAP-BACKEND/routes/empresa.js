var express = require('express');
var app = express();

var validation = require('../functions/validation');
var Empresa = require('../models/Empresa');

app.get('/', (req, res) => {
    Empresa.find({})
        .populate('cias')
        .exec((err, empresas) => {
            if (err) { return validation.err(res, 500, 'Error al obtener todos las empresas', err); }
            return validation.ok(res, 200, empresas);
        });
});

app.post('/', (req, res) => {
    var body = req.body;

    var empresaIn = new Empresa({
        nombre: body.nombre,
        cias: body.cias
    });

    empresaIn.save((err, empresaDB) => {
        if (err) { return validation.err(res, 500, 'Error al insertar el Empresa', err); }

        return validation.ok(res, 201, empresaDB);
    });

});

module.exports = app;