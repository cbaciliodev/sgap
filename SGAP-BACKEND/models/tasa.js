var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var tasaSchema = new Schema({
    
    codigo_tasa: { type: number, required: [true, 'Codigo de la tasa es requerido'] },
    riesgo: { type: Schema.Types.ObjectId, ref: 'Riesgo' },
    aseguradora: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    anio: {type: number, required: [ true, 'Año es requerido' ]} ,
    tasa: {type: number, required: [ true, 'Año es requerido' ]} ,
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
    
}, { collection: 'tasa' });

tasaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Tasa', tasaSchema);