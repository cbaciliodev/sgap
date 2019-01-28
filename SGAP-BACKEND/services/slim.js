var Slim = require('../models/slim');

module.exports = {
    toSlimFromBody:  toSlimFromBody,
    save: save
}

function toSlimFromBody( body, aseguradora, riesgo, uso ){
    return new Slim({
        riesgo: riesgo,
        aseguradora: aseguradora,
        cobertura: body.codigo,
        valor: body.valor,
        uso: uso
    });
}


function save( slim ){
    return new Promise( (resolve, reject)=>{
        slim.save( (err, slimBD) => {
            if( err ){ reject( err ); }
            resolve( slimBD );
        });
    });
}