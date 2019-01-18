var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    tipo_documento: { type: String },
    nro_documento: { type: String },
    razon_social: { type: String },
    nombre: { type: String },
    apellido_paterno: { type: String },
    apellido_materno: { type: String },
    is_empresa: { type: Boolean },
    fecha_nacimiento: { type: Date },
    pais: { type: String },
    departamento: { type: String },
    provincia: { type: String },
    distrito: { type: String },
    direccion: { type: String },
    correo_electronico: [{ tipo: { type: String }, valor: { type: String } }],
    telefonos: [{ tipo: { type: String }, valor: { type: String } }],
    agencia_reg: { type: Schema.Types.ObjectId, ref: 'Empresa' },
    usuario_reg: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fecha_reg: { type: Date },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'cliente' });

clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Cliente', clienteSchema);