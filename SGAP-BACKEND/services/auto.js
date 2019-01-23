var Auto = require('../models/auto');


module.exports =  {
    save: function ( autoNew ){
        return new Promise( (res, rej) => {
            var auto = parseToAuto( autoNew );
            auto.save( (err, autoSaved) => {
                if(err){ rej( err ); }
                res( autoSaved );
            });
        });
    },
    toAuto: function ( source ) { return parseToAuto( source ) }
}

function parseToAuto( source ){
    return new Auto({
        modelo: source.modelo._id,
        placa: source.placa,
        anio_fabricacion: source.anio_fabricacion,
        timon_cambiado: source.timon_cambiado 
    });
}
