var Prima = require('../models/prima');

var _gps = require('../services/gps');

module.exports = {
    save: function(primaNew, session) {
        return new Promise((res, rej) => {
            var prima = parseToPrima(primaNew);
            prima.save((err, primaSaved) => {
                if (err) { rej(err); }
                res(primaSaved);
            });
        });
    },
    generarPrima: function(tasa, aseguradora, monto_asegurable, auto) {

        let prima_neta = monto_asegurable * tasa.tasa;

        if (prima_neta < aseguradora.prima_minima) {
            prima_neta = aseguradora.prima_minima;
        }

        let prima_total = prima_neta * aseguradora.tasa;


        return new Promise((resolve, reject) => {
            _gps.list(tasa.aseguradora, auto.modelo).then(data => {

                let gps = false;

                if ((data != null) && (auto.anio_fabricacion >= (new Date().getFullYear() - data.antiguedad))) {
                    gps = true;
                }

                resolve({
                    prima_neta: prima_neta,
                    prima_total: prima_total,
                    cia: tasa.aseguradora,
                    tot_descuento: 0,
                    tot_incremento: 0,
                    fecha_reg: new Date(),
                    riesgo: tasa.riesgo,
                    gps: gps,
                    tasa: tasa.tasa,
                    tasa_final: tasa.tasa
                });
            });
        });
    }
}

function parseToPrima(source) {
    return new Prima({
        prima_neta: source.prima_neta,
        prima_total: source.prima_total,
        cia: source.cia,
        tot_descuento: source.tot_descuento,
        tot_incremento: source.tot_incremento,
        agencia_reg: source.agencia_reg,
        usuario_reg: source.usuario_reg,
        fecha_reg: source.fecha_reg,
        riesgo: source.riesgo,
        gps: source.gps,
        tasa: source.tasa,
        tasa_final: source.tasa_final
    });
}