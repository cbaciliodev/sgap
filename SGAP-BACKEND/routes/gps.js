var express = require('express');
var _f = require('../functions/validation');
var _gps = require('../services/gps');
var app = express();


app.get('/:aseguradora/:modelo', (req, res) => {

    let aseguradora = req.params.aseguradora;
    let modelo = req.params.modelo;

    _gps.list(aseguradora, modelo).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'No pudimos obtener el GPS asociado al modelo', err));
});

module.exports = app;