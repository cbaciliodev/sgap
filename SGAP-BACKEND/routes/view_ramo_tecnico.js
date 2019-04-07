var express = require('express');
var _f = require('../functions/validation');

var _viewRamoTecnico = require('../services/view_ramo_tecnico');

var app = express();


app.get('/', (req, res) => {
    
    _viewRamoTecnico.listAll().then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.ok(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'Error al consultar usos ramos tecnicos', err)
    );

});

app.get('/aseg/:id', (req, res) => {

    let idAseg = req.params.id;
    _viewRamoTecnico.findByAseguradora(idAseg).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        err => _f.ok(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'Error al consultar usos ramos tecnicos', err)
    );

});

module.exports = app;