var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var viewRamoTecnico = new Schema({
    aseguradora: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    alias: { type: String },
    valor: { type: String },
    orden: { type: Number },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'view_ramo_tecnico' });


module.exports = mongoose.model('ViewRamoTecnico', viewRamoTecnico);