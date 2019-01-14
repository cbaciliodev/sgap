var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

/**
 * Validar token
 */
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: true,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.decoded = decoded;

        next();
        // return res.status(200).json({
        //     ok: true,
        //     errors: decoded
        // });
    });
}