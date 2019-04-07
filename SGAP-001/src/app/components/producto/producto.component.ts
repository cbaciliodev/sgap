import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AseguradoraService, UsuarioService, RamoTecnicoService, ParametroService } from 'src/app/services/service.index';
import { Aseguradora } from '../../models/aseguradora.model';
import { UsoAseguradora } from '../../models/uso_aseguradora.model';
import { Archivo } from 'src/app/models/archivo.model';
import { Producto } from 'src/app/models/producto.model';
import { ModeloService } from '../../services/modelo/modelo.service';
import { Modelo } from '../../models/modelo.model';
import { Parametro } from 'src/app/models/parametro.model';
import { ParametroConstant } from 'src/app/constantes/parametroConstant';
import { Fecha } from 'src/app/models/fecha.model';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  @Input() producto: Producto = new Producto();
  @Input() cPrimaNeta = false;

  modelosFind: Array<Modelo> = [];
  isModeloFind: boolean = false;

  ramo: String = '';
  aseguradoras: Array<Aseguradora> = [];
  usos: Array<UsoAseguradora> = [];
  endosos: Array<Parametro> = [];
  empresas_gps: Array<Parametro> = [];
  ramo_tecnico: String = '';
  movimiento_prima = '';

  archivos: Array<Archivo> = [];



  constructor(  public _aseguradora: AseguradoraService,
                public _usuario: UsuarioService,
                public _ramoTecnico: RamoTecnicoService,
                public _modelo: ModeloService,
                public _parametro: ParametroService ) {
    this.listAll();
  }

  ngOnInit() {
    this.init();
  }

  listAll() {
    this._aseguradora.listAll( this._usuario.token ).subscribe( data => this.aseguradoras = data );
    this._parametro.listGroupChildren( ParametroConstant.GRUPO_ENDOSO ).subscribe( data => this.endosos = data );
    this._parametro.listGroupChildren( ParametroConstant.GRUPO_GPS ).subscribe( data => this.empresas_gps = data );
  }

  listUsos( ) {
    this.producto.ramo = undefined;
    this._ramoTecnico.listbyAseguradora( this.producto.cia ).subscribe( data => this.usos = data );
  }

  init() {
    this.ramo = localStorage.getItem( 'rtecnico' );
    this.movimiento_prima = localStorage.getItem( 'movimiento_prima' );
  }

  searchModelo(token, search) {
    this._modelo.search( token, search ).subscribe( data => {
      this.modelosFind = data;
      this.isModeloFind = true;
    } );
  }


  agregarProducto(){
    console.log( this.producto );
  }

  agregarVigenciaHasta(){
    const fechaPaso = this.producto.desde;
    this.producto.hasta = new Fecha( fechaPaso.year + 1, fechaPaso.month, fechaPaso.day );
  }

}
