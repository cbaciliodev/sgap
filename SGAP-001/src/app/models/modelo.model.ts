import { Marca } from './marca.model';

export class Modelo {
    public constructor(
        public _id: string,
        public nombre: string,
        public marca: Marca,
        public categoria: string,
        public estado: number
    ) { }
}
