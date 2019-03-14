import { Archivo } from './archivo.model';
import { Producto } from './producto.model';

export class Poliza {
    public constructor(
        public contratante?: string,
        public asegurado?: string,
        public contacto?: string,
        public fecha_registro?: Date,
        public empresa?: boolean,
        public archivos?: Array<Archivo>,
        public productos?: Array<String>,
        public prima_total?: Number,
        public _id?: string,
    ) {}
}
