import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  constructor( public http: HttpClient ) { }

  listAll() {
    let url = URL_SERVICIOS + '/poliza';
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
