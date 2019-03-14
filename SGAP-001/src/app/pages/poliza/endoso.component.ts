import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteSearchTextComponent } from '../../components/cliente/cliente-search-text/cliente-search-text.component';

@Component({
  selector: 'app-endoso',
  templateUrl: './endoso.component.html',
  styles: []
})
export class EndosoComponent implements OnInit {

  @ViewChild('contratante') contratante: ClienteSearchTextComponent;
  @ViewChild('asegurado') asegurado: ClienteSearchTextComponent;
  @ViewChild('contacto') contacto: ClienteSearchTextComponent;

  producto = '';

  constructor() { }

  ngOnInit() {
    this.contratante.escribirCliente('Ericson Huamaní');
    this.asegurado.escribirCliente('Ericson Huamaní');
    this.contacto.escribirCliente('Ericson Huamaní');

    this.producto = localStorage.getItem('ramo_nombre');
  }

}
