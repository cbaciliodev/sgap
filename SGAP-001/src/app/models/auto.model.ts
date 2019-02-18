import { Modelo } from './modelo.model';

export class Auto {
    public constructor(
        public modelo?: Modelo,
        public placa?: string,
        public anio_fabricacion?: number,
        public timon_cambiado?: boolean,
        public _id?: string
    ) {}
}
