var express = require('express');
var app = express();

var Auto = require('../models/auto');

// Rutas
app.get('/:id', (req, res, nex) => {

    let id = req.params.id;
    Auto.findById( id )
        .populate( 'modelo' )
        .exec((err, autos) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error cargando autos',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            data: autos,
            decoded: req.decoded
        });

    });
});

module.exports = app;