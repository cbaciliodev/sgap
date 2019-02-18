var Aseguradora = require('../models/aseguradora');


module.exports = {
    find: function(query) {
        return new Promise((res, rej) => {
            Aseguradora.find(query).exec((err, aseguradoras) => {
                if (err) { rej(err) }
                return res(aseguradoras);
            });
        });
    },

    findById: function(id) {
        return new Promise((res, rej) => {
            Aseguradora.findById(id).exec((err, aseguradoras) => {
                if (err) { rej(err) }
                return res(aseguradoras);
            });
        });
    }
}