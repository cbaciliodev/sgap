import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor( public http: HttpClient ) { }

  listGroupChildren( selector: string ) {
    let url = URL_SERVICIOS + '/parametro/grupo/' + selector;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }
}
