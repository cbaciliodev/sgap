var mongoose = require('mongoose');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var polizaSchema = new Schema({
    contratante: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    asegurado: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    contacto: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    fecha_registro: { type: Date },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' },
    archivos: [new Schema({ link: String, nombre: String })],
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'poliza' });

module.exports = mongoose.model('Poliza', polizaSchema);