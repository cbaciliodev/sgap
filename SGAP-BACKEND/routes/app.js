var express = require('express');
var app = express();


// Rutas
app.get('/', (req, res, nex) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición enviada OK'
    });
});

module.exports = app;