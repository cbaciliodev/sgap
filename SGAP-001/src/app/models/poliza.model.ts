import { Archivo } from './archivo.model';

export class Poliza {
    public constructor(
        public contratante?: string,
        public asegurado?: string,
        public contacto?: number,
        public fecha_registro?: boolean,
        public empresa?: string,
        public archivos?: Array<Archivo>,
        public _id?: string,
    ) {}
}
