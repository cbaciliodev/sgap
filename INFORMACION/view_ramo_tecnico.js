db.createView( 'view_ramo_tecnico', 'uso_aseguradora', 
    [
        { $lookup: {
           from: "parametro",
           localField: "valor",
           foreignField: "nombre",
           as: "uso_alias"
         } 
        },{
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$uso_alias", 0] }, "$$ROOT" ] }  }
        }, {
            $project: { uso_alias: 0, valor_numero: 0, grupo: 0, estado: 0, is_grupo: 0, nombre: 0 }
        }
    ] );