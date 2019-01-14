var express = require('express');
var validation = require('../functions/validation');
var fileUpload = require('express-fileupload');

var Usuario = require('../models/usuario');

var fs = require('fs');
var app = express();

app.use(fileUpload());

// Rutas

app.put('/:useriD', function(req, res) {

    if (!req.files) {
        return validation.err(res, 400, 'No seleccionó ninguna imagen');
    }

    var userID = req.params.useriD;

    // Obtener el archivo
    var file = req.files.imagen;

    // Usar MV para posicionar el archivo en otros datos
    file.mv('/data/sigap/uploads/' + file.name, function(err) {
        if (err) {
            return validation.err(res, 500, 'Error subiendo imagen', err);
        }

        return updateImageUser(res, userID, file.name);
    });
});

app.get('/', (req, res, nex) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición enviada OK'
    });
});

function updateImageUser(res, userID, avatar) {

    Usuario.findById(userID, (err, usuarioBD) => {

        // Eliminamos la imagen asignada al usuario anterior
        var oldPath = '/data/sigap/uploads/' + usuarioBD.avatar;
        if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }

        // Se asigna el nuevo usuario
        usuarioBD.avatar = avatar;

        usuarioBD.save((errUpdate, usuarioUpdated) => {
            if (err) {
                return validation.err(res, 500, 'No se pudo asignar el usuario', errUpdate);
            }

            return validation.ok(res, 200, usuarioUpdated);
        });
    });

}

module.exports = app;