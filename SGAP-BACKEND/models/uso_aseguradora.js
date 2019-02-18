var mongoose = require('mongoose');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var usoAseguradora = new Schema({
    aseguradora: { type: Schema.Types.ObjectId, ref: 'Aseguradora', required: [true, 'Nombre es requerido'] },
    valor: { type: String, required: true },
    alias: { type: String, required: true },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'uso_aseguradora' });


module.exports = mongoose.model('UsoAseguradora', usoAseguradora);