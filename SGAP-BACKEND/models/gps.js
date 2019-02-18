var mongoose = require('mongoose');

var ESTADOS = require('../config/config').ESTADOS;
var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var Schema = mongoose.Schema;

var gpsSchema = new Schema({
    aseguradora: { type: Schema.Types.ObjectId, ref: 'Aseguradora', required: [true, 'Nombre es requerido'] },
    modelo: { type: Schema.Types.ObjectId, ref: 'Modelo' },
    antiguedad: { type: Number, required: true },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO, enum: ESTADOS }
}, { collection: 'gps' });

/*
 * Estableciendo una consulta especifica para ser llamado por el service
 */
gpsSchema.query.byAseguradoraModelo = function(aseguradora, modelo) {
    return this.where({ aseguradora: mongoose.Types.ObjectId(aseguradora), modelo: mongoose.Types.ObjectId(modelo) });
};

module.exports = mongoose.model('Agencia', gpsSchema);