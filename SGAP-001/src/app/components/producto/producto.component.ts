import { Component, OnInit, Input } from '@angular/core';
import { AseguradoraService, UsuarioService } from 'src/app/services/service.index';
import { Aseguradora } from '../../models/aseguradora.model';
import { UsoAseguradora } from '../../models/uso_aseguradora.model';
import { Archivo } from 'src/app/models/archivo.model';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  @Input() producto: Producto;

  aseguradoras: Array<Aseguradora> = [];
  usos: Array<UsoAseguradora> = [];
  ramo: String = '';
  ramo_tecnico: String = '';
  archivos: Array<Archivo> = [];

  constructor(  public _aseguradora: AseguradoraService,
                public _usuario: UsuarioService ) {
    this.listAll();
  }

  ngOnInit() { }

  listAll() {
    this._aseguradora.listAll( this._usuario.token ).subscribe( data => this.aseguradoras = data );
  }

  listUsos( id: string ) {
    this._aseguradora.listUsos( this._usuario.token, id ).subscribe( data => this.usos = data );
  }

}
