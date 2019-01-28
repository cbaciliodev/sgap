import { Component, OnInit } from '@angular/core';
import { CoberturaService, UsuarioService, RiesgoService, CommonsService } from '../../services/service.index';

import swal from 'sweetalert';
import { Slim } from 'src/app/models/slim.model';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styles: []
})
export class CoberturasComponent implements OnInit {

  cobertura: any = {};
  riesgos: any = [];

  data_cobertura: Array<any> = [];
  riesgo: String = null;
  aseguradora: String = null;
  usos: String = null;

  constructor( protected _cobertura: CoberturaService, protected _usuario: UsuarioService,
    protected _riesgo: RiesgoService, protected _c: CommonsService ) {
    _cobertura.coberturaList( _usuario.token ).subscribe( data => this.cobertura = data );
  }

  ngOnInit() { }

  loadRiesgos( idCia ) {
    this.riesgo = null;
    this._riesgo.listByCia( idCia ).subscribe( data => this.riesgos = data );
  }

  registrarCobertura(){

    try{
      this._c.assertNotEmpty( this.aseguradora, 'Aseguradora no seleccionada' );
      this._c.assertNotEmpty( this.riesgo , 'Riesgo no seleccionado' );
      this._c.assertNotEmpty( this.usos , 'Usos no seleccionado' );

      let coberturas = [];

      for( let i in this.data_cobertura){
        coberturas.push( { codigo: this.cobertura.slim[i].nombre, valor: this.data_cobertura[i] } );
      }

      this._cobertura
      .saveSlim( new Slim( this.riesgo, this.aseguradora, coberturas, this.usos ) )
      .subscribe( data => { swal( 'Registramos con éxito todos los registros' , 'Atención', 'success'); });

    }catch(e){
      swal( e.message , 'Atención', 'warning');
    }
    
  }

}
