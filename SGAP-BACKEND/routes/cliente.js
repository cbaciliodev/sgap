var express = require('express');
var app = express();

var Cliente = require('../models/cliente');

// Rutas
app.get('/', (req, res, nex) => {
    Cliente
        .find({})
        .sort('apellido_paterno apellido_materno nombre razon_social')
        .exec((err, clientes) => {
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

app.get('/:id', (req, res, nex) => {

    let id = req.params.id;

    Cliente
        .findById(id)
        .exec((err, clientes) => {
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

app.get('/search/:data', (req, res, nex) => {

    var data = req.params.data;

    Cliente.find({
        $or: [{ nro_documento: { $regex: data, $options: 'i' } },
        { nombre: { $regex: data, $options: 'i' } },
        { apellido_paterno: { $regex: data, $options: 'i' } },
        { apellido_materno: { $regex: data, $options: 'i' } },
        { razon_social: { $regex: data, $options: 'i' } }
        ]
    }).exec((err, clientes) => {
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
        nro_documento: body.nro_documento,
        razon_social: body.razon_social,
        nombre: body.nombre,
        apellido_paterno: body.apellido_paterno,
        apellido_materno: body.apellido_materno,
        is_empresa: body.is_empresa,
        fecha_nacimiento: body.fecha_nacimiento,
        pais: body.pais,
        departamento: body.departamento,
        provincia: body.provincia,
        distrito: body.distrito,
        direccion: body.direccion,
        correo_electronico: body.correo_electronico,
        telefonos: body.telefonos,
        agencia_reg: body.agencia_reg,
        usuario_reg: body.usuario_reg,
        fecha_reg: body.fecha_reg
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