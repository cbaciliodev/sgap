var Riesgo = require('../models/riesgo');


module.exports = {
    find: find
}

function find(query) {
    return new Promise((res, rej) => {
        Riesgo.find(query, (err, riesgoBD) => {
            if (err) { rej(err); }
            res(riesgoBD);
        });
    });
}