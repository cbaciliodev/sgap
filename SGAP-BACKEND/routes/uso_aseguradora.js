var express = require('express');
var _f = require('../functions/validation');

var _usoAseguradora = require('../services/uso_aseguradora');

var app = express();


app.get('/aseg/:id', (req, res) => {

    let idAseg = req.params.id;
    _usoAseguradora.findByAseguradora(idAseg).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.ok(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'Error al consultar usos aseguradoras', err)
    );

});

module.exports = app;