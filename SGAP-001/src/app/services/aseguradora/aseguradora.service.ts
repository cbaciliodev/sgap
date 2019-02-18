import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AseguradoraService {

  constructor( public http: HttpClient ) { }

  getById( token: String, id: String ) {
    let url = URL_SERVICIOS + '/aseguradora/' + id + '?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }

  listAll( token: String ) {
    let url = URL_SERVICIOS + '/aseguradora/all?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }

  listUsos( token: String, id: String ) {
    let url = URL_SERVICIOS + '/uso_aseg/aseg/' + id + '?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
