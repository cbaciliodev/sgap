import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor( public http: HttpClient ) { }

  getById( token: String, id: String ) {
    let url = URL_SERVICIOS + '/auto/' + id + '?token=' + token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
