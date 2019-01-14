var express = require('express');

var app = express();

var validation = require('../functions/validation');
var Cotizacion = require('../models/cotizacion');

app.get('/', (req, res) => {
    Cotizacion.find({})
        .populate('cliente')
        .exec((err, cotizaciones) => {
            if (err) { return validation.err(res, 500, 'Error al obtener todos las cotizaciones', err); }
            return validation.ok(res, 200, cotizaciones);
        });
});

module.exports = app;