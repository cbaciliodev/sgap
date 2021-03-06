var express = require('express');
var _f = require('../functions/validation');
var _slim = require('../services/slim');

var app = express();


// Rutas
app.post('/', (req, res, nex) => {

    var body = req.body;
    var promises = [];

    for (let i in body.cobertura) {
        promises.push(_slim.save(_slim.toSlimFromBody(body.cobertura[i], body.aseguradora, body.riesgo, body.uso)));
    }

    Promise.all(promises).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, err.message, err));

});

app.get('/:aseguradora/:riesgo/:tipo_slip', (req, res) => {

    let aseguradora = req.params.aseguradora;
    let riesgo = req.params.riesgo;
    let tipo_slip = req.params.tipo_slip;

    _slim.list(riesgo, aseguradora, tipo_slip).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, err.message, err));

});

module.exports = app;