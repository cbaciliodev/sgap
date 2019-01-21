import { TipoContacto } from 'src/app/models/tipo_contacto.model';
export class Cliente {
    public constructor(
        public _id?: string,
        public nro_documento?: string,
        public razon_social?: string,
        public nombre?: string,
        public apellido_paterno?: string,
        public apellido_materno?: string,
        public is_empresa?: boolean,
        public fecha_nacimiento?: Date,
        public departamento?: string,
        public provincia?: string ,
        public distrito?: string ,
        public direccion?: string,
        public fecha_reg?: string,
        public estado?: number,
        public correo_electronico?: Array<TipoContacto>,
        public telefonos?: Array<TipoContacto>
    ) { }
}
