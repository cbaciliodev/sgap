var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var agenciaSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'], unique: true },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'agencia' });

agenciaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Agencia', agenciaSchema);