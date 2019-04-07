import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Archivo } from 'src/app/models/archivo.model';

@Component({
  selector: 'app-frm-archivo',
  templateUrl: './frm-archivo.component.html',
  styles: []
})
export class FrmArchivoComponent implements OnInit {

  @Input() isCloseButton = false;

  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() archivoEmiter: EventEmitter<Archivo> = new EventEmitter();

  archivo: Archivo = new Archivo( '', '' );

  constructor() { }

  ngOnInit() {
  }

  cerrarFormulario() {
    this.closeDialog.emit( false );
  }

  agregarArchivo() {
    this.archivoEmiter.emit( this.archivo );
    this.archivo = new Archivo();
  }

}
