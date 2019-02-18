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

  SUB_COMPONENTS = { CLIENTE: 0, ARCHIVO: 1, PRODUCTO: 2 };

  archivo: any = {};
  producto: Producto = new Producto();
  poliza: Poliza = new Poliza();

  productos: Array<any> = [];
  archivos: Array<any> = [];

  titulo_subpage = '';
  selected_subpage;

  constructor(private _usuario: UsuarioService,
    private _poliza: PolizaService) { }

  ngOnInit() {
  }

  agregarArchivo() {
    this.archivos.push(this.archivo);
    this.cleanFormArchivo();
  }

  cleanFormArchivo() {
    this.archivo = {};
  }

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
