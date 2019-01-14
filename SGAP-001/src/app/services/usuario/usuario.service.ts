import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario = null;
  token: string = null;

  constructor( public http: HttpClient,
    public router: Router) {
    this.loadUserFromLocalStorage();
  }

  listAll() {
    let url = URL_SERVICIOS + '/usuario?token=' + this.token;
    return this.http.get( url ).pipe( map( ( _: any) => _.data ) );
  }

  autenticar( nickname: string, password: string ) {
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, this.toJsonLogin(nickname, password) ).pipe(
      map( (resp: any) => {

        let usuario = resp.data;
        this.saveUserLocalStorage( resp.token, usuario );
        swal(resp.data.nombre, 'Bienvenido', 'success');

      })
    );
  }

  loadUserFromLocalStorage() {
    if ( localStorage.getItem('token') ) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
    }
  }

  saveUserLocalStorage(token: string, usuario: Usuario) {
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  isAutenticated() {
    return this.token !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.usuario = null;
    this.token = null;

    this.router.navigate( ['/login'] );
  }

  private toJsonLogin( nickname: string, password: string ) {
    return {
      correo: nickname,
      password: password
    };
  }
}
