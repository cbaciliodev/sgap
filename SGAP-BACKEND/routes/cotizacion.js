var express = require('express');

var app = express();

var validation = require('../functions/validation');
var Cotizacion = require('../models/cotizacion');
var _commons = require('../functions/commons');

var HTTP_RESPONSES = validation.HTTP_RESPONSES;

/* Controllers */
var _modelo_riesgo = require('../services/modelo_riesgo');
var _auto = require('../services/auto');
var _tasa = require('../services/tasa');
var _prima = require('../services/prima');

app.get('/', (req, res) => {
    Cotizacion.find({})
        .populate('cliente')
        .exec((err, cotizaciones) => {
            if (err) { return validation.err(res, 500, 'Error al obtener todos las cotizaciones', err); }
            return validation.ok(res, 200, cotizaciones);
        });
});

app.get('/:id', (req, res) => {

    let id = req.params.id;
    Cotizacion.findById(id)
        .populate('cliente')
        .populate('auto')
        .populate('primas')
        .exec((err, cotizaciones) => {
            if (err) { return validation.err(res, 500, 'Error al obtener todos las cotizaciones', err); }
            return validation.ok(res, 200, cotizaciones);
        });

});

app.post('/', (req, res) => {

    var body = req.body;

    var codigoWeb = _commons.random_text(6);

    var cotizacion = new Cotizacion({
        codigo: codigoWeb,
        cliente: body.cliente,
        producto: body.producto,
        tasa: 0,
        auto: _auto.toAuto(body.auto),
        timon_cambiado: body.timon_cambiado,
        uso: body.uso,
        en_tramite: body.en_tramite,
        is_nuevo: body.is_nuevo,
        suma_aseg: body.suma_aseg,
        primas: null,
        is_confirmado: body.is_confirmado,
        prima_seleccionada: null,
        agencia_reg: body.agencia_reg,
        usuario_reg: body.usuario_reg,
        fecha_reg: new Date(),
        estado: body.estado
    });

    saveCotizacion(cotizacion).then(
        _res => { return validation.ok(res, HTTP_RESPONSES.SUCCESS, _res) },
        _err => { return validation.err(res, HTTP_RESPONSES.INTERNAL_SERVER, 'No encontramos suficiente información para generar la cotización', _err) }
    );
});

function saveCotizacion(cotizacion) {

    let anio = 0;

    if (cotizacion.is_nuevo) {
        anio = (new Date().getFullYear() - cotizacion.auto.anio_fabricacion);
    }

    return new Promise((res, rej) => {

        _modelo_riesgo.findPopulate({ modelo: cotizacion.auto.modelo }).then(
            _data_mr => {

                let _tasas = [];
                let _aseguradora = [];
                let _primas = [];

                for (var _mr in _data_mr) {
                    _aseguradora.push(_data_mr[_mr].aseguradora);
                    _tasas.push(_tasa.findOne({ riesgo: _data_mr[_mr].riesgo, anio: anio }));
                }

                Promise.all(_tasas).then(async _tasas_array => {

                    // Guardando las tasas
                    for (var _ta in _tasas_array) {
                        await _prima.generarPrima(
                                _tasas_array[_ta], _aseguradora[_ta], cotizacion.suma_aseg, cotizacion.auto)
                            .then(prima => _primas.push(_prima.save(prima)));
                    }

                    // Guardando el auto
                    _primas.push(_auto.save(cotizacion.auto));

                    Promise.all(_primas).then(_primas_bd => {

                        updateCotizacion(_primas_bd, cotizacion);

                        cotizacion.save((err, cot_bd) => {
                            if (err) {
                                rej(err);
                            }
                            res(cot_bd);
                        });

                    }, _err => rej(_err));

                }, _err => rej(_err));

            }, _err => rej(_err)
        )

    });

}

function updateCotizacion(data_promise, cotizacion) {
    cotizacion.primas = _commons.partial_array(0, (data_promise.length - 2), data_promise);
    cotizacion.auto = data_promise[data_promise.length - 1]._id;
}

module.exports = app;