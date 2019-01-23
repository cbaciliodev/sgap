var Prima = require('../models/prima');

module.exports =  {
    save: function ( primaNew ){
        return new Promise( (res, rej) => {
            var prima = parseToPrima( primaNew );
            prima.save( (err, primaSaved) => {
                if(err){ rej( err ); }
                res( primaSaved );
            });
        });
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
