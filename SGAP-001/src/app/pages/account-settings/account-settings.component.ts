import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.aplicarCheck( this._ajustes.ajustes.tema );
  }

  cambiarColor( tema: string ) {

    this.aplicarCheck( tema );
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( tema: string ) {
    let selectores: any = document.getElementsByClassName('selector');

    for ( let ref of selectores ) {

      if ( ref.getAttribute( 'data-theme' ) === tema ) {
        ref.classList.add('working');
        continue;
      }

      ref.classList.remove( 'working' );
    }

  }
}
