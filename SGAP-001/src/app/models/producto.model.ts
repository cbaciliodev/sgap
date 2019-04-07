import { Fecha } from "./fecha.model";

export class Producto {
    public constructor(
        public cia?: string,
        public ramo?: string,
        
        /**
         * Vehicular
         */
        public modelo?: string,
        public anio?: number,
        public placa?: string,
        public nro_serie?: string,
        public nro_motor?: string,
        public gps_emp?: string,
        
        /**
         * Campos comunes
         */
        public endoso?: string,
        public desde?: Fecha,
        public hasta?: Fecha,
        public nro_poliza?: string,
        public prima_neta?: string,
        
        public _id?: string,
    ) { }
}
