import { Parametro } from 'src/app/models/parametro.model';

export class TipoContacto {
    public constructor(
        public tipo?: string,
        public valor?: string,
        public parametro?: Parametro
    ) { }
}
