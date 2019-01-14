var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ correo: body.correo }, (err, usuarioBd) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al obtener el usuario',
                exception: err
            });
        }

        if (!usuarioBd) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - correo',
                exception: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioBd.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - contraseña',
                exception: err
            });
        }

        usuarioBd.password = '...';
        // Crear un tokenID
        // paiload: Data que se quiere registrar en el token
        // seed: Indicador que dice que es y hace unico nuestro JWT
        var token = jwt.sign({ usuario: usuarioBd }, SEED, { expiresIn: 14000 });

        return res.status(200).json({
            ok: true,
            data: usuarioBd,
            token: token
        });

    });



});

module.exports = app;