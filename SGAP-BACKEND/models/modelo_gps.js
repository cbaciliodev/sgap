var mongoose = require('mongoose');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var modeloGPSSchema = new Schema({
    hasta_anio: { type: Number, required: [true, 'Número es requerido'], unique: true },
    modelo: { type: Schema.Types.ObjectId, ref: 'Modelo' },
    aseguradora: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    gps: { type: Boolean, required: [ true, 'GPS es requerido'], default: true },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'modelo_gps' });

module.exports = mongoose.model('ModeloGps', modeloGPSSchema);