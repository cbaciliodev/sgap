var Prima = require('../models/prima');

module.exports =  {
    save: function ( primaNew, session ){
        return new Promise( (res, rej) => {
            var prima = parseToPrima( primaNew );
            prima.save( (err, primaSaved) => {
                if(err){ rej( err ); }
                res( primaSaved );
            });
        });
    },
    generarPrima: function (tasa, aseguradora, monto_asegurable) {

        let prima_neta = monto_asegurable * tasa.tasa;

        if (prima_neta < aseguradora.prima_minima) {
            prima_neta = aseguradora.prima_minima;
        }

        let prima_total = prima_neta * aseguradora.tasa;

        return prima = {
            prima_neta: prima_neta,
            prima_total: prima_total,
            cia: tasa.aseguradora,
            tot_descuento: 0,
            tot_incremento: 0,
            fecha_reg: new Date()
        }

    }
}

function parseToPrima( source ){
    return new Prima({
        prima_neta: source.prima_neta,
        prima_total: source.prima_total,
        cia: source.cia,
        tot_descuento: source.tot_descuento,
        tot_incremento: source.tot_incremento,
        agencia_reg: source.agencia_reg,
        usuario_reg: source.usuario_reg,
        fecha_reg: source.fecha_reg
    });
}
