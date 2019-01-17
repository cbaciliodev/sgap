var express = require('express');
var app = express();

var Parametro = require('../models/parametro');

// Rutas
app.get('/', (req, res, nex) => {

    Parametro.find({}).exec((err, parametros) => {

        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error cargando parametros',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            data: parametros
        });
    });
});

app.get('/grupo/:grupo', (req, res, nex) => {

    var grupo = req.params.grupo;

    Parametro.findOne({ nombre: grupo }).exec((err, parametro) => {

        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error cargando parametros',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            data: parametro.parametros
        });
    });
});

module.exports = app;