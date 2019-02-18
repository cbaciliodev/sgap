var Poliza = require('../models/poliza');


module.exports = {
    find: find,
    findById: findById
}

function find(query) {
    return new Promise((res, rej) => {
        Poliza.find(query, (err, polizaBD) => {
            if (err) { rej(err); }
            res(polizaBD);
        });
    });
}

function findById(id) {
    return new Promise((res, rej) => {
        Poliza.findById(id).exec((err, polizaBD) => {
            if (err) { rej(err); }
            res(polizaBD);
        });
    });
}