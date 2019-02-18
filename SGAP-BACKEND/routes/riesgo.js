var express = require('express');
var _f = require('../functions/validation');

var _riesgo = require('../services/riesgo');

var app = express();


// Rutas
app.get('/cia/:id', (req, res) => {

    let ciaQuery = { aseguradora: req.params.id };

    _riesgo.find(ciaQuery).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'Error al consultar riesgo', err)
    );

});

app.get('/:id', (req, res) => {

    let id = req.params.id;

    _riesgo.findById(id).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'Error al consultar riesgo', err)
    );

});

module.exports = app;