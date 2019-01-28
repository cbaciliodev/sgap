import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {

  constructor( protected http: HttpClient) { }

  listByCia( ciaId ) {
    let url = URL_SERVICIOS + '/riesgo/cia/' + ciaId;
    return this.http.get( url ).pipe( map( (_: any) => _.data ) );
  }
}
