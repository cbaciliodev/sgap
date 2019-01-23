var ModeloRiesgo = require('../models/modelo_riesgo');

module.exports = {
    find: function( query ){
        return new Promise( (res, rej) => {
            ModeloRiesgo.find( query )
                        .exec((err, modelosRiesgos) => {
                            if (err) { rej( err ) }
                            res( modelosRiesgos );
                        });
        });
    },
    findPopulate: function( query ){
        return new Promise( (res, rej) => {

            ModeloRiesgo.find( query )
                        .populate('modelo')
                        .populate('aseguradora')
                        .exec((err, modelosRiesgos) => {
                            if (err) { rej( err ) }
                            res( modelosRiesgos );
                        });
        });
    }
}