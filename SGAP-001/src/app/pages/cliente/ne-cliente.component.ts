import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParametroService } from 'src/app/services/service.index';
import { Parametro } from 'src/app/models/parametro.model';
import { Cliente } from 'src/app/models/cliente.model';
import { GRUPO_TIPO_DOCUMENTO, GRUPO_DEPARTAMENTO, GRUPO_PROVINCIA, GRUPO_DISTRITO, GRUPO_TIPO_DATO_CLIENTE } from 'src/app/config/constants';
import { TipoContacto } from 'src/app/models/tipo_contacto.model';

declare function init_datepicker();

@Component({
  selector: 'app-ne-cliente',
  templateUrl: './ne-cliente.component.html'
})
export class NeClienteComponent implements OnInit, AfterViewInit {

  cliente: Cliente = new Cliente();
  tiposContactoTelefono: Array<TipoContacto> = [];
  tiposContactoCorreo: Array<TipoContacto> = [];

  tiposDocumento: Array<Parametro> = [];
  departamentos: Array<Parametro> = [];
  provincias: Array<Parametro> = [];
  distritos: Array<Parametro> = [];
  tiposDatosCliente: Array<Parametro> = [];

  tipoDocumento: Parametro = new Parametro();
  pais: Parametro = new Parametro();
  tdcTelefono: Parametro = new Parametro();
  tdcEmail: Parametro = new Parametro();

  constructor( public _parametro: ParametroService) {
    this.init();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    init_datepicker();
  }

  init() {
    this._parametro.listGroupChildren( GRUPO_TIPO_DOCUMENTO ).subscribe( _data => {
      this.tiposDocumento = _data;
      this.tipoDocumento = this.tiposDocumento[0];
    } );

    this._parametro.listGroupChildren( GRUPO_DEPARTAMENTO ).subscribe( _data => this.departamentos = _data );
    this._parametro.listGroupChildren( GRUPO_TIPO_DATO_CLIENTE ).subscribe( _data => {
      this.tiposDatosCliente = _data;
      this.tdcTelefono = _data[0];
      this.tdcEmail = _data[0];
    });

    this.agregarNumeroTelefonico();
    this.agregarCorreo();
  }

  listProvincias( departamento: string ) {
    this._parametro.listByGroupStartName( GRUPO_PROVINCIA, departamento ).subscribe( _data => this.provincias = _data );
    this.distritos = [];
  }

  listDistritos( distrito: string ) {
    this._parametro.listByGroupStartName( GRUPO_DISTRITO, distrito ).subscribe( _data => this.distritos = _data );
  }

  agregarNumeroTelefonico() {
    this.tiposContactoTelefono.push( new TipoContacto() );
  }

  agregarCorreo() {
  this.tiposContactoCorreo.push( new TipoContacto() );
  }

  eliminarNumeroTelefonico( i: number ) {
    this.tiposContactoTelefono.splice(i, i);
  }

  eliminarCorreo( i: number ) {
    this.tiposContactoCorreo.splice(i, i);
  }
}
