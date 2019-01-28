var express = require('express');
var _f = require('../functions/validation');

var CONSTANT = require('../functions/constant');
var _parametro = require('../services/parametro');
var _aseguradora = require('../services/aseguradora');

var app = express();


// Rutas
app.get('/', async(req, res) => {

    try {

        let retorno = {};

        // Obteniendo los slim
        let slim_data = await _parametro.findByGroup(CONSTANT.GRUPO_SLIM);
        
        // Obteniendo usos vehiculares
        retorno.usos_vehicular = await _parametro.findByGroup(CONSTANT.GRUPO_USO_VEHICULAR);

        // Agregando hijos a los padres
        retorno.slim = await _parametro.findChildByGroup(slim_data);

        // Obteniendo las empresas aseguradoras
        retorno.cias = await _aseguradora.find({});

        _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, retorno);

    } catch (e) {
        _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, e.message, e);
    }


});

module.exports = app;