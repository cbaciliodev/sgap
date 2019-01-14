var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var modeloSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es requerido'], unique: true },
    marca: { type: Schema.Types.ObjectId, ref: 'MarcaAuto' },
    categoria: { type: String, required: [true, 'Categoría es requerida'] },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'modelo' });

modeloSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Modelo', modeloSchema);