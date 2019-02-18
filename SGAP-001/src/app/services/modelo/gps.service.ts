import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor( public http: HttpClient ) { }

  listByAseguradoraAndModel( aseguradora, modelo ) {
    let url = URL_SERVICIOS + '/gps/' + aseguradora + '/' + modelo;
    return this.http.get( url ).pipe( map( ( _: any ) => _.data ) );
  }

}
