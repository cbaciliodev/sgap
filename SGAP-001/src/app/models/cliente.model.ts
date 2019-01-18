export class Cliente {
    public constructor(
        public _id?: string,
        public nro_documento?: string,
        public razon_social?: string,
        public nombre?: string,
        public apellido_paterno?: string,
        public apellido_materno?: string,
        public is_empresa?: boolean,
        public fecha_nacimiento?: string,
        public direccion?: string,
        public fecha_reg?: string,
        public estado?: number
    ) { }
}
