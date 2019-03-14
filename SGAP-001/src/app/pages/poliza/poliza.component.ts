import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model';
import { UsuarioService, PolizaService } from 'src/app/services/service.index';

import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: []
})
export class PolizaComponent implements OnInit {

  poliza: Poliza = new Poliza();
  polizas: Array<Poliza> = [
    new Poliza('Ericson Huamaní', 'Ericson Huamaní', 'Ericson Huamaní', new Date(2019, 3, 5), false, null, [ 'Oncológico', 'Vehicular' ], 1250, 'a001' ),
    new Poliza('Eder Manuel', 'Ericson Huamaní', 'Eder Manuel', new Date(2019, 3, 3), false, null, [ 'Vehicular' ], 650, 'a001' ),
    new Poliza('Oswaldo Mayaute', 'Oswaldo Mayaute', 'Ericson Huamaní', new Date(2019, 3, 2), false, null, [ 'Vehicular' ], 800, 'a002' )
  ];

  constructor(private _usuario: UsuarioService,
    private _poliza: PolizaService) { }

  ngOnInit() {
    this._poliza.listAll(this._usuario.token)
      .subscribe(res => {
        this.polizas = res;
      });
  }

  seleccionarPoliza( data ) {
    this.poliza = data;
  }

  endosoLink() {
    this.router.navigate( ['/polizas/endoso'] );
  }

  ramo( uso, nombre ) {
    localStorage.setItem( 'rtecnico', uso );
    localStorage.setItem( 'ramo_nombre', nombre );
  }

  movimiento_prima( movimiento ) {
    localStorage.setItem( 'movimiento_prima', movimiento );
  }

}
