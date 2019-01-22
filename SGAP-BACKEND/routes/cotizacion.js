var express = require('express');

var app = express();

var validation = require('../functions/validation');
var Cotizacion = require('../models/cotizacion');
var Modelo = require('../models/modelo');
var Auto = require('../models/auto');
var Tasa = require('../models/tasa');
var ModeloRiesgo = require('../models/modelo_riesgo');

var _commons = require('../functions/commons');

var HTTP_RESPONSES = validation.HTTP_RESPONSES;

app.get('/', (req, res) => {
    Cotizacion.find({})
        .populate('cliente')
        .exec((err, cotizaciones) => {
            if (err) { return validation.err(res, 500, 'Error al obtener todos las cotizaciones', err); }
            return validation.ok(res, 200, cotizaciones);
        });
});

app.post('/', (req, res) => {

    var body = req.body;

    var codigoWeb = _commons.random_text( 6 );

    var cotizacion = new Cotizacion({
        codigo: codigoWeb,
        cliente: body.cliente,
        producto: body.producto,
        //tasa: body.tasa,
        tasa: 4.3,
        auto: body.auto,
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
    
    saveAuto( body.auto ).then( _data => {
        cotizacion.auto = _data;
        cotizacion.save( (err, cotizacionSaved) => {
            if( err ){
                return validation.err( res, HTTP_RESPONSES.INTERNAL_SERVER, 'Error al insertar cotizacion', err );
            }
            return validation.ok( res, HTTP_RESPONSES.SUCCESS, cotizacionSaved );
        });
    } );
});

function saveAuto( autoWeb ) {


    
    return new Promise( function(resolve, reject) {

        getModelo( autoWeb.modelo._id ).then( _m => {

            var auto = new Auto({
                modelo: _m._id,
                placa: autoWeb.placa,
                anio_fabricacion: autoWeb.anio_fabricacion,
                timon_cambiado: autoWeb.timon_cambiado}
            );
        
            auto.save( (err, autoSaved) => {
                console.log()
                console.log( err );
                if(err){
                    reject( err );
                }
        
                resolve( autoSaved );
            });
        });
    });
}

function getModelo( _id ){
    return new Promise( function(resolve, reject){
        Modelo.findById( _id, (err, res)=>{
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
}

function getTasa( riesgo, anio ){
    return new Promise( (resolve, reject) => {
        Tasa.findOne( { riesgo: riesgo, anio: anio } )
        .exec( (err, tasas) => {
            if(err){ reject(err); }
            resolve( tasas );
        })
    });
}

function getModelosRiesgos( _idModelo ){
    return new Promise( (resolve, reject) => {
        ModeloRiesgo.find( { modelo: _idModelo }, ( err, res ) =>{
            if(err){ reject(err) }
            resolve(res);
        });
    });
}



module.exports = app;