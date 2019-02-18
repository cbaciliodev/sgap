import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClienteService, UsuarioService } from 'src/app/services/service.index';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-cliente-search-text',
  templateUrl: './cliente-search-text.component.html',
  styleUrls: [ ]
})
export class ClienteSearchTextComponent implements OnInit {

  @Input() titulo_search = 'Cliente';
  @Input() section = 1;
  @Output() emit_cliente: EventEmitter<String> = new EventEmitter();

  clientsFind: Array<Cliente> = [];
  isClientFind: boolean = false;
  cliente: String = '';

  constructor( public _cliente: ClienteService,
               public _usuario: UsuarioService ) { }

  ngOnInit() { }

  searchClient(token, search) {
    this._cliente.search( token, search ).subscribe( data => {
      this.clientsFind = data;
      this.isClientFind = true;
    } );
  }

  seleccionar_cliente( cliente: Cliente ) {
    this.emit_cliente.emit( cliente._id );
  }

}
