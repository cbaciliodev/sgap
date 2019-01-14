var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');

var midlewareToken = require('../middleware/autenticacion');

var Usuario = require('../models/usuario');

/**
 * Obtiene todos los usuarios
 */
app.get('/', midlewareToken.verificaToken, (req, res, nex) => {

    Usuario.find({}, 'nombre correo img role').exec((err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error cargando usuarios',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            data: usuarios,
            decoded: req.decoded
        });

    });
});

/**
 * Registra un usuario
 */
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            data: usuarioBD
        });
    });


});

/**
 * Actualizar usuario
 */
app.put('/:id', midlewareToken.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error al consultar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: true,
                mensaje: 'El usuario no fué encontrado',
                errors: err
            });
        }

        usuario.nombre = body.nombre;
        usuario.correo = body.correo;
        usuario.role = body.role;

        usuario.save((err, usuarioBD) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioBD.password = '...'

            res.status(200).json({
                ok: true,
                data: usuarioBD
            });
        });
    });
});

/**
 * Eliminar un usuario
 */
app.delete('/:id', midlewareToken.verificaToken, (req, res) => {

    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioDb) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        if (!usuarioDb) {
            return res.status(400).json({
                ok: true,
                mensaje: 'No existe usuario con ese ID',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            data: usuarioDb
        });
    });

});

module.exports = app;