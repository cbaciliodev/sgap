import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Array<Usuario>;
  cargando: boolean = true;

  constructor( public _usuario: UsuarioService ) {
    this.init();
   }

  ngOnInit() { }

  init() {
    this.listar();
  }

  listar() {
    this._usuario.listAll().subscribe( data => { this.usuarios = data; this.cargando = false; } );
  }

}
