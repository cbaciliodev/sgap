import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model';
import { UsuarioService, PolizaService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-ne-poliza',
  templateUrl: './ne-poliza.component.html',
  styles: []
})
export class NePolizaComponent implements OnInit {

  producto: Producto = new Producto();
  poliza: Poliza = new Poliza();

  productos: Array<any> = [];
  archivos: Array<any> = [];
  archivosPoliza: Array<any> = [];
  

  constructor(  private _usuario: UsuarioService,
                private _poliza: PolizaService ) { }

  ngOnInit() { }

  agregarProducto() {
    this.productos.push(this.producto);
    this.producto = {};
  }

  registrarPoliza() {
    this.poliza.archivos = this.archivos;
    this.poliza.productos = this.productos;

    this._poliza.save(this._usuario.token, this.poliza)
      .subscribe(_ => {
        swal('Confirmación', 'Registramos la poliza de manera satisfactoria', 'success');
      }, _ => swal('Alerta', 'Tuvimos inconvenientes al registrar la poliza', 'danger'));
  }

}
