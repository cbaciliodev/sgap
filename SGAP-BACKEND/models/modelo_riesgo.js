var mongoose = require('mongoose');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var modeloRiesgoSchema = new Schema({
    hasta_anio: { type: Number, required: [true, 'Número es requerido'], unique: true },
    modelo: { type: Schema.Types.ObjectId, ref: 'Modelo' },
    aseguradora: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    riesgo: { type: Schema.Types.ObjectId, ref: 'Riesgo' },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'modelo_riesgo' });

module.exports = mongoose.model('ModeloRiesgo', modeloRiesgoSchema);