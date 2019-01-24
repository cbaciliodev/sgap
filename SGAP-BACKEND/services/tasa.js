var Tasa = require('../models/tasa');


module.exports = {
    findOne: function (query) {
        return new Promise((res, rej) => {
            Tasa.findOne(query, (err, tasaBD) => {
                if (err) { rej(err); }
                res(tasaBD);
            });
        });
    }
}