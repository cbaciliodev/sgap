var express = require('express');
var _f = require('../functions/validation');
var app = express();


// Rutas
app.get('/', (req, res, nex) => {
    _f.ok(res, _f.HTTP_RESPONSES.SUCCESS, 'Petición enviada OK');
});

module.exports = app;