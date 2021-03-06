var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ESTADO_ACTIVO = require('../config/config').ESTADO_ACTIVO;

var productoSchema = new Schema({
    cia: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    ramo: { type: Schema.Types.ObjectId, ref: 'Aseguradora' },
    nro_poliza: { type: String },
    prima_neta: { type: String },
    poliza: { type: Schema.Types.ObjectId, ref: 'Poliza' },
    estado: { type: Number, required: true, default: ESTADO_ACTIVO }
}, { collection: 'producto' });

module.exports = mongoose.model('Producto', productoSchema);