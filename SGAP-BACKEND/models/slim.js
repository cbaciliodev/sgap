var mongoose = require('mongoose');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var slimSchema = new Schema({
    riesgo: { type: Schema.Types.ObjectId, ref: 'Riesgo' },
    aseguradora: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    cobertura: { type: String, required: [ true, 'Cobertura es requerido' ] },
    valor: { type: String, required: [ true, 'Valor es requerido' ] },
    uso: { type: String, required: [ true, 'Uso es requerido' ] },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'slim' });

module.exports = mongoose.model('Slim', slimSchema);