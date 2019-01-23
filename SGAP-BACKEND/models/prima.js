var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var PrimaSchema = new Schema({
    prima_neta: { type: Number, required: [true, 'Prima neta es requerido'] },
    prima_total: { type: Number, required: [true, 'Prima neta es requerido'] },
    cia: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    tot_descuento: { type: Number },
    tot_incremento: { type: Number },
    agencia_reg: { type: Schema.Types.ObjectId, ref: 'Empresa' },
    usuario_reg: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fecha_reg: { type: Date },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'prima' });

PrimaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Prima', PrimaSchema);