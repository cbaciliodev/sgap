var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var EmpresaSchema = new Schema({
    razon_social: { type: String, required: [true, 'Nombre es requerido'], unique: true },
    cias: [{ type: Schema.Types.ObjectId, ref: 'Aseguradora' }],
    is_empresa: { type: Boolean, required: [true, 'Falta validar si es empresa'], default: true },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'empresa' });

EmpresaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

EmpresaSchema.add({ empresa_matriz: { type: Schema.Types.ObjectId, ref: 'EmpresaSchema' } });

module.exports = mongoose.model('Empresa', EmpresaSchema);