import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-frm-producto',
  templateUrl: './frm-producto.component.html',
  styles: []
})
export class FrmProductoComponent implements OnInit {

  @Input() isNew = true;
  @Input() isCloseButton = false;

  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();

  titulo: String = 'NUEVO';
  producto: Producto = new Producto();

  constructor() {}

  ngOnInit() {
    if ( !this.isNew ) {
      this.titulo = 'EDICION DE';
    }
  }

  cerrarFormulario() {
    this.closeDialog.emit( false );
  }
}
