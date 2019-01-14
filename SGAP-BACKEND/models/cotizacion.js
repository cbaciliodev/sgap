var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var cotizacionSchema = new Schema({
    codigo: { type: String, required: [true, 'Codigo es requerido'], unique: true },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    producto: { type: Schema.Types.ObjectId, ref: 'Parametro', required: [true, 'Producto contratado es requerido'] },
    tasa: { type: Schema.Types.ObjectId, ref: 'Parametro', required: [true, 'Tasa contratado es requerido'] },
    auto: { type: Schema.Types.ObjectId, ref: 'Auto', required: [true, 'Tasa contratado es requerido'] },
    timon_cambiado: { type: Boolean },
    uso: { type: Schema.Types.ObjectId, ref: 'Parametro', required: [true, 'Uso contratado es requerido'] },
    is_nuevo: { type: Boolean, required: [true, 'Especificar si el auto es nuevo o no'] },
    suma_aseg: { type: Number },
    primas: [{ type: Schema.Types.ObjectId, ref: 'Prima' }],
    is_confirmado: { type: Boolean },
    prima_seleccionada: [{ type: Schema.Types.ObjectId, ref: 'Prima' }],
    agencia_reg: { type: Schema.Types.ObjectId, ref: 'Empresa' },
    usuario_reg: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fecha_reg: { type: Date },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'cotizacion' });

cotizacionSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Cotizacion', cotizacionSchema);