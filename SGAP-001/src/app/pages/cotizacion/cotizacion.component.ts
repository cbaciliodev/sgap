import { Component, OnInit } from '@angular/core';
import { CotizacionService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  cotizaciones: Array<any> = [];

  constructor( public _cotizacion: CotizacionService, public _usuario: UsuarioService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.listAll();
  }

  listAll() {
    this._cotizacion.listAll( this._usuario.token ).subscribe( data => { console.log(data); this.cotizaciones = data; } );
  }

}
