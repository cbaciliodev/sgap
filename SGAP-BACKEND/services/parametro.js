var Parametro = require('../models/parametro');

var _f = require( '../functions/commons' );

module.exports = {
    findByGroup: findByGroup,
    findChildByGroup: findChildByGroup
}

function findByGroup(group) {

    return new Promise((resolve, reject) => {
        Parametro.find({ grupo: group }).exec((err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });

}

function findChildByGroup(groupArray) {

    return new Promise((resolve, reject) => {

        let pChild = [];
        let parametroJsonArray = [];

        try {

            for (var i in groupArray) {
                pChild.push(findByGroup(groupArray[i].nombre));
            }

            Promise.all(pChild).then(data => {

                for (var i in data) {
                    parametroJsonArray.push(toJsonObject(groupArray[i]));
                    _f.push_array( parametroJsonArray, data[i] );
                }

                resolve(parametroJsonArray);

            });
        } catch (e) {
            reject(e);
        }
    });

}

function toJsonObject(parametro) {

    return {
        _id: parametro._id,
        grupo: parametro.grupo,
        nombre: parametro.nombre,
        alias: parametro.alias,
        orden: parametro.orden,
        is_grupo: parametro.is_grupo,
        valor_numero: parametro.valor_numero
    }

}