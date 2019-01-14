import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor( public http: HttpClient ) { }

  listAll( token: String ) {
    let url = URL_SERVICIOS + '/cotizacion?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
