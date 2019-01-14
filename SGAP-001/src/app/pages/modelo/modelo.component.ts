import { Component, OnInit } from '@angular/core';
import { ModeloService, UsuarioService } from 'src/app/services/service.index';
import { Modelo } from '../../models/modelo.model';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {

  cargando: boolean = true;
  modelos: Array<Modelo> = [];

  constructor(  public _modelo:  ModeloService, public _usuario: UsuarioService ) {
    this.listAll();
  }

  ngOnInit() {
  }

  listAll() {
    this._modelo.listAll( this._usuario.token ).subscribe( data => { this.modelos = data; this.cargando = false; });
  }

}
