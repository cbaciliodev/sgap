import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class RamoTecnicoService {

  constructor( public http: HttpClient ) { }

  listbyAseguradora(idAseguradora: string) {
    let url = URL_SERVICIOS + '/v_ramo/aseg/' + idAseguradora;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
