export class Aseguradora {
    public constructor(
        public _id?: string,
        public nombre?: string,
        public prima_minima?: Number,
        public prima_max_gps?: Number,
        public tasa?: Number,
        public logo?: string
    ) { }
}
