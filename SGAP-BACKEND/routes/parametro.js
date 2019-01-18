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

    Parametro.find({ grupo: grupo }).exec((err, parametros) => {

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

app.get('/sw/:grupo/:nombre', (req, res, nex) => {

    var nombre = req.params.nombre;
    var grupo = req.params.grupo;

    Parametro.find({ nombre: { $regex: '^' + nombre, $options: 'i' }, grupo: grupo }).exec((err, parametros) => {

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