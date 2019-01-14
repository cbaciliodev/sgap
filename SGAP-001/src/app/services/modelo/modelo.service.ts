import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor( public http: HttpClient ) { }

  listAll( token: String ) {
    let url = URL_SERVICIOS + '/modelo?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
