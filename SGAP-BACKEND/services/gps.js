var Gps = require('../models/gps');


module.exports = {
    list: list
}

function list(aseguradora, modelo) {

    return new Promise((resolve, rejec) => {

        Gps.findOne().byAseguradoraModelo(aseguradora, modelo).exec((err, gpsData) => {
            if (err) { rejec(err); }
            resolve(gpsData);
        });

    })



}