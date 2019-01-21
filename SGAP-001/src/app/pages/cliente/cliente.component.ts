import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes: Array<Cliente> = [];

  constructor( public _cliente: ClienteService, public _usuario: UsuarioService) { 
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this._cliente.listAll( this._usuario.token ).subscribe( _data => this.clientes = _data );
  }

}
