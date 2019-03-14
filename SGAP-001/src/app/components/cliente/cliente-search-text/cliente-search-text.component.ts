import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @Input() cliente: String = '';
  @Output() emit_cliente: EventEmitter<String> = new EventEmitter();

  @ViewChild('cliente') textoBuscado: ElementRef;

  clientsFind: Array<Cliente> = [];
  isClientFind: boolean = false;

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


  escribirCliente( nombre ) {
    this.textoBuscado.nativeElement.value = nombre;
  }

}
