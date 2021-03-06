var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var ParametroSchema = new Schema({
    grupo: { type: String, required: [true, 'Nombre es requerido'] },
    nombre: { type: String, required: [true, 'Nombre es requerido'] },
    alias: { type: String, required: true },
    orden: { type: Number, required: true },
    valor_texto: { type: String },
    valor_numero: { type: Number },
    is_grupo: { type: Number },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS },
}, { collection: 'parametro' });

ParametroSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Parametro', ParametroSchema);