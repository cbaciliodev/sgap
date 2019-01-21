import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import { Cliente } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor( public http: HttpClient ) { }

  search( token: String, search: String ) {
    let url = URL_SERVICIOS + '/cliente/search/' + search + '?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }

  listAll( token: String ) {
    let url = URL_SERVICIOS + '/cliente/?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }

  save( token: String, cliente: Cliente ) {
    let url = URL_SERVICIOS + '/cliente/';
    return this.http.post( url, cliente );
  }
}
