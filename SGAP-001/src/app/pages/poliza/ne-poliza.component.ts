import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model';

@Component({
  selector: 'app-ne-poliza',
  templateUrl: './ne-poliza.component.html',
  styles: []
})
export class NePolizaComponent implements OnInit {

  SUB_COMPONENTS = { CLIENTE: 0, ARCHIVO: 1, PRODUCTO: 2 };

  productos: Array<any> = [];
  archivos: Array<any> = [];

  archivo: any = {};

  poliza: Poliza = new Poliza();

  titulo_subpage = '';
  selected_subpage;

  constructor() { }

  ngOnInit() {
  }

  agregarArchivo() {
    this.archivos.push( this.archivo );
    this.cleanFormArchivo();
  }

  cleanFormArchivo() {
    this.archivo = {};
  }

}
