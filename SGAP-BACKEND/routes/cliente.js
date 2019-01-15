var express = require('express');
var app = express();

var Cliente = require('../models/cliente');

// Rutas
app.get('/', (req, res, nex) => {
    Cliente.find({}).exec((err, clientes) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error cargando clientes',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            data: clientes,
            decoded: req.decoded
        });

    });
});

app.post('/', (req, res) => {

    var body = req.body;

    var cliente = new Cliente({
        nro_documento: body.nombre,
        razon_social: body.nombre,
        nombre: body.nombre,
        apellido_paterno: body.nombre,
        apellido_materno: body.nombre,
        is_empresa: body.nombre,
        fecha_nacimiento: body.nombre,
        pais: body.nombre,
        departamento: body.nombre,
        provincia: body.nombre,
        distrito: body.nombre,
        direccion: body.nombre,
        correo_electronico: body.nombre,
        telefonos: body.nombre,
        agencia_reg: body.nombre,
        usuario_reg: body.nombre,
        fecha_reg: body.nombre,
        estado: body.nombre,
    });

    cliente.save((err, clienteBD) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                mensaje: 'Error al crear cliente',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            data: clienteBD
        });
    });


});

module.exports = app;