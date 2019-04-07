import { Injectable } from '@angular/core';
import { isEmpty } from 'rxjs/operators';
import { AseguradoraService } from '../aseguradora/aseguradora.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor( public _aseguradora: AseguradoraService,
              public _usuario: UsuarioService ) { }

  isEmpty( value ) {
    return (typeof value == 'undefined' || value==null);
  }

  assertNotEmpty( value, message ) {
    if ( this.isEmpty( value ) ) {
      throw ( new Error( this.isEmpty(message) ? 'Error empty value' : message) );
    }
  }
}
