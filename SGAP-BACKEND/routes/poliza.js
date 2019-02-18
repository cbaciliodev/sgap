var express = require('express');
var _f = require('../functions/validation');

var _poliza = require('../services/poliza');
var Poliza = require('../models/poliza');
var Producto = require('../models/producto');

var app = express();


// Rutas
app.get('/', (req, res) => {
    /* _poliza.find({}).then(
        data => _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, data),
        error => _f.err(res, _f.HTTP_RESPONSES.INTERNAL_SERVER, 'Error al listar polizas', error)
    ) */
    Producto.aggregate()
        .group({
            _id: '$poliza',
            productos: { $sum: 1 },
            ramos: { $push: '$ramo' }
        })
        .lookup({
            from: 'poliza',
            localField: '_id',
            foreignField: '_id',
            as: 'poliza'
        })
        .unwind('$poliza')
        .lookup({
            from: 'cliente',
            localField: 'poliza.contratante',
            foreignField: '_id',
            as: 'contratante'
        })
        .unwind('$contratante')
        .lookup({
            from: 'cliente',
            localField: 'poliza.asegurado',
            foreignField: '_id',
            as: 'asegurado'
        })
        .unwind('$asegurado')
        .project({
            _id: 0,
            poliza: '$_id',
            productos: 1,
            contratante: {
                $concat: [
                    '$contratante.nombre',
                    ' ',
                    '$contratante.apellido_paterno',
                    ' ',
                    '$contratante.apellido_materno'
                ]
            },
            asegurado: {
                $concat: [
                    '$asegurado.nombre',
                    ' ',
                    '$asegurado.apellido_paterno',
                    ' ',
                    '$asegurado.apellido_materno'
                ]
            },
            ramos: 1
        })
        .exec((err, productos) => {
            if (err) return res.status(500).json({ mensaje: 'Error cargando polizas' });
            return res.status(200).json(productos);
        });
});

app.post('/save', (req, res) => {
    var body = req.body;
    var poliza = new Poliza({
        contratante: body.contratante,
        asegurado: body.asegurado,
        contacto: body.contacto,
        fecha_registro: body.fecha_registro,
        empresa: body.empresa,
        archivos: body.archivos
    });

    poliza.save((err, poliza) => {
        if (err) return res.status(400).json({ mensaje: 'Error al crear poliza' });

        var productos = body.productos;
        for (let i = 0; i < productos.length; i++) {
            productos[i].poliza = poliza._id;
        }

        Producto.insertMany(productos, (err) => {
            if (err) return res.status(400).json({ mensaje: 'Error al crear productos' });
            return res.status(201).json({ ok: true, data: poliza });
        });
    });
});

module.exports = app;