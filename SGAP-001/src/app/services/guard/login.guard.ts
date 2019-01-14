import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public _usuario: UsuarioService,
    public router: Router) { }

  canActivate() {
    if ( this._usuario.isAutenticated() ) {
      return true;
    }

    this.router.navigate( ['/login'] );
  }
}
