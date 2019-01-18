import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Modelo } from 'src/app/models/modelo.model';
import { UsuarioService,
        ClienteService,
        ModeloService,
        ParametroService } from 'src/app/services/service.index';

import swal from 'sweetalert';
import { Cotizacion } from 'src/app/models/cotizacion.model';

import { GRUPO_USO_VEHICULAR } from 'src/app/config/constants';
import { Parametro } from 'src/app/models/parametro.model';



@Component({
  selector: 'app-ne-cotizacion',
  templateUrl: './ne-cotizacion.component.html',
  styleUrls: []
})
export class NeCotizacionComponent implements OnInit {

  isClientFind: boolean = false;
  isModeloFind: boolean = false;
  clientsFind: Array<Cliente> = [];
  modelosFind: Array<Modelo> = [];

  /* LISTAS GENERALES */
  usosVehiculares: Array<Parametro> = [];

  cotizacion: Cotizacion = new Cotizacion();

  @ViewChild('anio') txtAnio: ElementRef;

  constructor( public _cliente: ClienteService,
                public _modelo: ModeloService,
                public _usuario: UsuarioService,
                public _parametro: ParametroService ) {
                  this.listUsos();
  }

  ngOnInit() {  }

  searchClient(token, search) {
    this._cliente.search( token, search ).subscribe( data => {
      this.clientsFind = data;
      this.isClientFind = true;
    } );
  }

  searchModelo(token, search) {
    this._modelo.search( token, search ).subscribe( data => {
      this.modelosFind = data;
      this.isModeloFind = true;
    } );
  }

  listUsos() {
    this._parametro.listGroupChildren( GRUPO_USO_VEHICULAR ).subscribe( data => this.usosVehiculares = data );
  }

  checkTramite( event ) {
    this.cotizacion.en_tramite = event.target.checked;
  }

  validarAnio( event ) {
    this.cotizacion.is_nuevo = event.target.checked;
  }

  validarNuevo( value: number ) {
    console.log('anio: ' + this.txtAnio.nativeElement.value);
    let currentYear = new Date().getFullYear();

    if ( (this.txtAnio.nativeElement.value !== '') && (this.cotizacion.is_nuevo) ){
      if ( (currentYear - value) > 1 ) {
        swal('Atención', 'El año ingresado no aplica para nuevo, lo corregimos al año actual', 'warning');
        this.txtAnio.nativeElement.value = currentYear;
      }
    }

  }

  cotizador( ) {
    swal('Atención', 'No hemos encontrado información suficiente para generar la cotización', 'warning');
  }
}
