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

module.exports = app;