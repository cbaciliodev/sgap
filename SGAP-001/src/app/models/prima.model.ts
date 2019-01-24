import { Aseguradora } from "./aseguradora.model";

export class Prima {
    public constructor(
        public _id?: string,
        public prima_neta?: string,
        public prima_total?: string,
        public cia?: Aseguradora,
        public tot_descuentio?: string,
        public tot_incremento?: number
    ) { }
}
