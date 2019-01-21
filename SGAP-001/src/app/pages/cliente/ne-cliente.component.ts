import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ParametroService, UsuarioService } from 'src/app/services/service.index';
import { Parametro } from 'src/app/models/parametro.model';
import { Cliente } from 'src/app/models/cliente.model';
import { GRUPO_TIPO_DOCUMENTO, GRUPO_DEPARTAMENTO, GRUPO_PROVINCIA, GRUPO_DISTRITO, GRUPO_TIPO_DATO_CLIENTE } from 'src/app/config/constants';
import { TipoContacto } from 'src/app/models/tipo_contacto.model';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/cliente/cliente.service';
import swal from 'sweetalert';

declare function init_datepicker();

@Component({
  selector: 'app-ne-cliente',
  templateUrl: './ne-cliente.component.html'
})
export class NeClienteComponent implements OnInit, AfterViewInit {

  @ViewChild('fechaNacimiento')
  fechaNacimiento: ElementRef;

  cliente: Cliente = new Cliente();
  tiposContactoTelefono: Array<TipoContacto> = [];
  tiposContactoCorreo: Array<TipoContacto> = [];

  tiposDocumento: Array<Parametro> = [];
  departamentos: Array<Parametro> = [];
  provincias: Array<Parametro> = [];
  distritos: Array<Parametro> = [];
  tiposDatosCliente: Array<Parametro> = [];

  tipoDocumento: Parametro = new Parametro();
  tipoDato: Parametro = new Parametro();

  constructor( public _parametro: ParametroService, public _cliente: ClienteService, public _usuario: UsuarioService) {
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
      this.tipoDato = _data[0];

      this.agregarNumeroTelefonico();
      this.agregarCorreo();
    });

  }

  listProvincias( departamento: string ) {
    this._parametro.listByGroupStartName( GRUPO_PROVINCIA, departamento ).subscribe( _data => this.provincias = _data );
    this.distritos = [];
  }

  listDistritos( distrito: string ) {
    this._parametro.listByGroupStartName( GRUPO_DISTRITO, distrito ).subscribe( _data => this.distritos = _data );
  }

  agregarNumeroTelefonico() {
    let tipoContacto = new TipoContacto();
    tipoContacto.parametro = this.tipoDato;
    tipoContacto.tipo = this.tipoDato.nombre;

    this.tiposContactoTelefono.push( tipoContacto );
  }

  eliminarNumeroTelefonico( i: number ) {
    this.tiposContactoTelefono.splice(i, i);
  }

  agregarCorreo() {
    let tipoContacto = new TipoContacto();
    tipoContacto.parametro = this.tipoDato;
    tipoContacto.tipo = this.tipoDato.nombre;

    this.tiposContactoCorreo.push( tipoContacto );
  }

  eliminarCorreo( i: number ) {
    this.tiposContactoCorreo.splice(i, i);
  }

  registrarCliente( ) {
    let parts = this.fechaNacimiento.nativeElement.value.split('-');

    this.cliente.telefonos = this.tiposContactoTelefono;
    this.cliente.correo_electronico = this.tiposContactoCorreo;
    this.cliente.fecha_nacimiento = new Date(parts[2], parts[1], parts[0]);

    this._cliente.save( this._usuario.token, this.cliente ).subscribe( (_data: any) => {
      swal( 'Confirmación', 'Registramos el cliente de manera satisfactoria', 'success' );
    }, (err: any) => {
      swal( 'Alerta', 'Tuvimos inconvenientes al registrar el usuario', 'danger' );
    });
  }

  setCorreoInIndex( parametro: Parametro, index: number ) {
    this.tiposContactoCorreo[index].parametro = parametro;
    this.tiposContactoCorreo[index].tipo = parametro.nombre;
  }

  setTelefonoInIndex( parametro: Parametro, index: number ) {
    this.tiposContactoTelefono[index].parametro = parametro;
    this.tiposContactoTelefono[index].tipo = parametro.nombre;
  }
}
