import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( public http: HttpClient ) { }

  search( token: String, search: String ) {
    let url = URL_SERVICIOS + '/cliente/search/' + search + '?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
