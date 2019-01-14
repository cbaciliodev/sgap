var express = require('express');
var app = express();

var validation = require('../functions/validation');
var Modelo = require('../models/modelo');

app.get('/', (req, res) => {

    var skip = req.query.skip || 0;
    var records = req.query.records || null;

    skip = Number(skip);
    records = Number(records);

    console.log(skip);
    console.log(records);

    modelosOrm = Modelo.find({}).populate('marca', 'nombre').skip(skip);

    if (!validation.isEmpty(records)) {
        modelosOrm.limit(records);
    }

    modelosOrm.exec((err, modelos) => {

        if (err) { return validation.err(res, 500, 'Error al obtener todos los modelos', err); }

        Modelo.countDocuments({}, (err, cant) => {
            modelos.totalRecords = cant;
            return validation.ok(res, 200, modelos);
        });


    });
});

app.post('/', (req, res) => {
    var body = req.body;

    var modelo = new Modelo({
        nombre: body.nombre,
        marca: body.marca
    });

    modelo.save((err, modeloDB) => {
        if (err) { return validation.err(res, 500, 'Error al insertar el modelo', err); }

        return validation.ok(res, 201, modeloDB);
    });

});

module.exports = app;