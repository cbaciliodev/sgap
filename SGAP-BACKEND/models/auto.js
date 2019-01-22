var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var autoSchema = new Schema({
    modelo: { type: Schema.Types.ObjectId, ref: 'Modelo' },
    placa: { type: String },
    anio_fabricacion: { type: Number },
    timon_cambiado: { type: Boolean }
}, { collection: 'auto' });

autoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Auto', autoSchema);