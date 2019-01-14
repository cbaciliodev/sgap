import { Component, OnInit } from '@angular/core';
import { CotizacionService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'cotizacion-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class CGestionComponent implements OnInit {

  cotizaciones: Array<any> = [
    {
      cotizacion: 'W0690-2018',
      agencia: 'Nepo Keta',
      cliente: 'GUTIERREZ LEIVA, STEVE',
      vehiculo: 'BMW X1'
    },
    {
      cotizacion: 'W0687-2018',
      agencia: 'Nepo Keta',
      cliente: 'VIGO ROJAS, ROBERTO',
      vehiculo: 'Audi Q7'
    },
    {
      cotizacion: 'W0687-2018',
      agencia: 'Nepo Keta',
      cliente: 'GAMBONI , GIANCARLO',
      vehiculo: 'Kia Sorento'
    }
  ];

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
