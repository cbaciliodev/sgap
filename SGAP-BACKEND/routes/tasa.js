var express = require('express');
var app = express();

var validation = require('../functions/validation');
var Tasa = require('../models/tasa');

app.get('/:riesgo/:anio', (req, res) => {

    var riesgo = req.params.riesgo;
    var anio = req.params.anio;

    Tasa.find({ riesgo: riesgo, anio: anio })
        .exec((err, tasas) => {
            if (err) { return validation.err(res, 500, 'Error al obtener todos las tasas', err); }
            return validation.ok(res, 200, tasas);
        });
});

module.exports = app;