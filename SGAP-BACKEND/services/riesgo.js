var Riesgo = require('../models/riesgo');


module.exports = {
    find: find,
    findById: findById
}

function find(query) {
    return new Promise((res, rej) => {
        Riesgo.find(query, (err, riesgoBD) => {
            if (err) { rej(err); }
            res(riesgoBD);
        });
    });
}

function findById(id) {
    return new Promise((res, rej) => {
        Riesgo.findById(id).exec((err, riesgoBD) => {
            if (err) { rej(err); }
            res(riesgoBD);
        });
    });
}