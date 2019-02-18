var express = require('express');
var _f = require('../functions/validation');

var _poliza = require('../services/poliza');

var app = express();


// Rutas
app.get('/', (req, res) => {

    _poliza.find({}).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        error => _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'Error al listar polizas', error)
    )


});

module.exports = app;