import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Slim } from 'src/app/models/slim.model';

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  constructor( protected httpClient: HttpClient ) { }

  coberturaList( token: String ) {
    let url = URL_SERVICIOS + '/cobertura/?token=' + token;
    return this.httpClient.get( url ).pipe( map( (_: any) => _.data ) );
  }

  slimList( token: String, aseguradora: String, riesgo: String, tipo_slip: String ) {
    let url = URL_SERVICIOS + '/slim/' + aseguradora + '/' + riesgo + '/' + tipo_slip + '?token=' + token;
    return this.httpClient.get( url ).pipe( map( (_: any) => _.data ) );
  }

  saveSlim( slim: Slim ) {
    let url = URL_SERVICIOS + '/slim/';
    return this.httpClient.post( url, slim ).pipe( map( (_: any) => _.data ) );
  }
}
