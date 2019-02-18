var UsoAseguradora = require('../models/uso_aseguradora');

var mongoose = require('mongoose');

module.exports = {
    findByAseguradora: findByAseguradora
}

function findByAseguradora(id) {
    console.log(id);
    return new Promise((res, rej) => {
        UsoAseguradora.find({ aseguradora: mongoose.Types.ObjectId(id) }).exec((err, usoAseguradoraBD) => {
            if (err) { rej(err); }
            res(usoAseguradoraBD);
        });
    });
}