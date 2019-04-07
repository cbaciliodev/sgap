var ViewRamoTecnico = require('../models/view_ramo_tecnico');

var mongoose = require('mongoose');

module.exports = {
    listAll: listAll,
    findByAseguradora: findByAseguradora
}

function listAll() {
    return new Promise((res, rej) => {
        ViewRamoTecnico
            .find()
            .sort({ orden: 1 })
            .exec((err, viewRamoTecnicoBD) => {
                if (err) { rej(err); }
                res(viewRamoTecnicoBD);
            });
    });
}

function findByAseguradora(id) {
    return new Promise((res, rej) => {
        ViewRamoTecnico
            .find({ aseguradora: mongoose.Types.ObjectId(id) })
            .sort({ orden: 1 })
            .exec((err, viewRamoTecnicoBD) => {
                if (err) { rej(err); }
                res(viewRamoTecnicoBD);
            });
    });
}