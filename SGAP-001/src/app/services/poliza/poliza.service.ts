import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Poliza } from 'src/app/models/poliza.model';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  constructor(public http: HttpClient) { }

  listAll(token: String) {
    let url = URL_SERVICIOS + '/poliza/?token=' + token;
    return this.http.get<Poliza[]>(url);
  }

  save(token: String, poliza: Poliza) {
    let url = URL_SERVICIOS + '/poliza/save';
    return this.http.post(url, poliza);
  }
}
