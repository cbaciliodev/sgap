import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import { Cotizacion } from 'src/app/models/cotizacion.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor( public http: HttpClient ) { }

  listAll( token: String ) {
    let url = URL_SERVICIOS + '/cotizacion?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }

  getById( token: String, id: String ) {
    let url = URL_SERVICIOS + '/cotizacion/' + id + '?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }

  save( token: String, cotizacion: Cotizacion ) {
    let url = URL_SERVICIOS + '/cotizacion/?token=' + token;
    return this.http.post( url, cotizacion ).pipe( map( ( _: any) => _.data ) );
  }
}
