import { Component, OnInit, Input } from '@angular/core';
import { AseguradoraService, UsuarioService } from 'src/app/services/service.index';
import { Aseguradora } from '../../models/aseguradora.model';
import { UsoAseguradora } from '../../models/uso_aseguradora.model';
import { Archivo } from 'src/app/models/archivo.model';
import { Producto } from 'src/app/models/producto.model';
import { ModeloService } from '../../services/modelo/modelo.service';
import { Modelo } from '../../models/modelo.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  @Input() producto: Producto;

  @Input() showRamo = 'true';

  modelosFind: Array<Modelo> = [];
  isModeloFind: boolean = false;

  ramo: String = '';
  aseguradoras: Array<Aseguradora> = [];
  usos: Array<UsoAseguradora> = [];
  ramo_tecnico: String = '';
  archivos: Array<Archivo> = [];
  movimiento_prima = '';

  constructor(  public _aseguradora: AseguradoraService,
                public _usuario: UsuarioService,
                public _modelo: ModeloService ) {
    this.listAll();
  }

  ngOnInit() {
    this.init();
  }

  listAll() {
    this._aseguradora.listAll( this._usuario.token ).subscribe( data => this.aseguradoras = data );
  }

  listUsos( id: string ) {
    this._aseguradora.listUsos( this._usuario.token, id ).subscribe( data => this.usos = data );
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

}
