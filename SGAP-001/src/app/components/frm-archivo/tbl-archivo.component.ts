import { Component, OnInit, Input } from '@angular/core';
import { Archivo } from 'src/app/models/archivo.model';

import swal from 'sweetalert';

@Component({
  selector: 'app-tbl-archivo',
  templateUrl: './tbl-archivo.component.html',
  styles: []
})
export class TblArchivoComponent implements OnInit {

  @Input() data: Array<Archivo> = [];

  constructor() { }

  ngOnInit() {
  }

  beforeDelete(index: number): void {
    swal('¿Desea eliminar el registro ' + this.data[index].link + '?' , {
        closeOnClickOutside: false,
        buttons: { 
          cancel: 'Cancelar',
          catch: {
            text: 'Eliminar',
            value: true
          }
         }
      }
    ).then( (value) => {
      if ( value ) {
        this.deleteArchivo( index );
      }
    });
  }

  deleteArchivo(index: number): void {
    this.data.splice(index, 1 );
  }


}
