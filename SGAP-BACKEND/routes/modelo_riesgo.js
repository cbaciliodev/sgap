var express = require('express');
var app = express();

var validation = require('../functions/validation');
var ModeloRiesgo = require('../models/modelo_riesgo');

app.get('/', (req, res) => {
    ModeloRiesgo.find({})
    .populate('modelo')
    .populate('aseguradora')
        .exec((err, modelosRiesgos) => {
            if (err) { return validation.err(res, 500, 'Error al obtener todos las modelos Riesgos', err); }
            return validation.ok(res, 200, modelosRiesgos);
        });
});

app.post('/', (req, res) => {
    var body = req.body;

    var modeloRiesgoIn = new ModeloRiesgo({
        hasta_anio: body.hasta_anio,
        modelo: body.modelo,
        aseguradora: body.aseguradora,
        riesgo: body.riesgo
    });

    modeloRiesgoIn.save((err, modeloRiesgoDB) => {
        if (err) { return validation.err(res, 500, 'Error al insertar el Modelo Riesgo', err); }

        return validation.ok(res, 201, modeloRiesgoDB);
    });

});

module.exports = app;