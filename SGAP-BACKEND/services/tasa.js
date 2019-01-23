var Tasa = require('../models/tasa');


module.exports =  {
    findOne: function ( query ){
        return new Promise( (res, rej) => {

            console.log( 'ENCONTRANDO TASA' );
            console.log( query );

            Tasa.findOne( query, (err, tasaBD) => {
                if(err){ rej( err ); }

                console.log( 'TASA ENCONTRADA' );
                console.log( tasaBD );

                res( tasaBD );
            });
        });
    }
}
