import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';
import { Auto } from 'src/app/models/auto.model';
import { Cliente } from 'src/app/models/cliente.model';
import { GRUPO_DEPARTAMENTO, GRUPO_PROVINCIA, GRUPO_DISTRITO, GRUPO_COBERTURA, GRUPO_COBERTURA_ADICIONAL, GRUPO_SERVICIOS_ASISTENCIAS, GRUPO_DEDUCIBLES } from 'src/app/config/constants';
import { Aseguradora } from '../../models/aseguradora.model';

import { CotizacionService,
          UsuarioService,
          ClienteService,
          AutoService,
          ParametroService,
          GpsService,
          AseguradoraService,
          CoberturaService,
          RiesgoService } from 'src/app/services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-prev-cotizacion',
  templateUrl: './prev-cotizacion.component.html',
  styles: ['./cotizacion.component.css']
})
export class PrevCotizacionComponent implements OnInit {

  cotizacion: any = {};
  auto: Auto = new Auto();
  cliente: Cliente = new Cliente();
  aseguradoras: Array<Aseguradora> = [];

  coberturaData = [];
  coberturaAdicionalData = [];
  serviciosAsistenciaData = [];
  deduciblesData = [];

  descuentos = [];
  incrementos = [];
  primasCotizacion = [];
  descuentos_com = [];

  isLoading = true;

  cssStruct: any = {};

  constructor( public activatedRoute: ActivatedRoute,
    public _usuario: UsuarioService,
    public _cliente: ClienteService,
    public _auto: AutoService,
    public _parametro: ParametroService,
    public _cotizacion: CotizacionService,
    public _aseguradora: AseguradoraService,
    public _cobertura: CoberturaService,
    public _gps: GpsService,
    public _riesgo: RiesgoService ) {
    this.activatedRoute.params.subscribe( params => {
      _cotizacion.getById( _usuario.token, params['id'] ).subscribe( _c => {

        this.cotizacion = _c;
        this.generateCss();

        forkJoin(
          _auto.getById( _usuario.token, this.cotizacion.auto._id ),
          _cliente.getById( _usuario.token, this.cotizacion.cliente._id )
        ).subscribe( ([auto, cliente]) => {
          this.auto = auto ;
          this.cliente = cliente;
          this.buscarParametros();
        });

      });
    });
  }

  ngOnInit() {}

  async buscarParametros() {

    forkJoin(
      this._parametro.listByGroupStartName( GRUPO_DEPARTAMENTO, this.cliente.departamento ),
      this._parametro.listByGroupStartName( GRUPO_PROVINCIA, this.cliente.provincia ),
      this._parametro.listByGroupStartName( GRUPO_DISTRITO, this.cliente.distrito )
    ).subscribe( ([ dep, prov, dist ]) => {
      this.cliente.departamento = dep[0].alias;
      this.cliente.provincia = prov[0].alias;
      this.cliente.distrito = dist[0].alias;

      this.isLoading = false;
    });

    // Obteniendo las cias
    for ( let e of this.cotizacion.primas ) {

      console.log( e );

      this.primasCotizacion.push( e.prima_total );

      this._aseguradora.getById( this._usuario.token, e.cia ).subscribe( data => this.aseguradoras.push(data) );

      this._cobertura.slimList( this._usuario.token,
                                      e.cia,
                                      e.riesgo,
                                      GRUPO_COBERTURA ).subscribe( data => this.coberturaData.push( data ) );

      this._cobertura.slimList( this._usuario.token,
                                      e.cia,
                                      e.riesgo,
                                      GRUPO_COBERTURA_ADICIONAL ).subscribe( data => this.coberturaAdicionalData.push( data ) );

      this._cobertura.slimList( this._usuario.token,
                                      e.cia,
                                      e.riesgo,
                                      GRUPO_SERVICIOS_ASISTENCIAS ).subscribe( data => this.serviciosAsistenciaData.push( data ) );

      this._cobertura.slimList( this._usuario.token,
                                      e.cia,
                                      e.riesgo,
                                      GRUPO_DEDUCIBLES ).subscribe( data => this.deduciblesData.push( data ) );
    }

  }

  generateCss() {

    this.cssStruct.colCias = 6;
    this.cssStruct.colCoberturas = 6;

    if ( this.cotizacion.primas.length === 5 ) {
      this.cssStruct.colCias = 2;
      this.cssStruct.colCoberturas = 2;
    }

    if ( this.cotizacion.primas.length === 4 ) {
      this.cssStruct.colCias = 2;
      this.cssStruct.colCoberturas = 4;
    }

    if ( this.cotizacion.primas.length === 3 ) {
      this.cssStruct.colCias = 3;
      this.cssStruct.colCoberturas = 3;
    }

    if ( this.cotizacion.primas.length === 2 ) {
      this.cssStruct.colCias = 4;
      this.cssStruct.colCoberturas = 4;
    }
  }

  calcular( i: number ) {

    if ( this.descuentos[i] != null ) {
      this._riesgo.getById( this.cotizacion.primas[i].riesgo ).subscribe(
        riesgoDB => {
          if ( this.descuentos[i] <= riesgoDB.desc_max_com ) {
  
            let descuento = this.obtener_descuento( i );
            let incremento = descuento;
  
            if ( (this.incrementos[i] != null) && (this.incrementos[i] != 0) ) {
              incremento = descuento * (1 + this.incrementos[i] / 100);
            }
  
            this.cotizacion.primas[i].prima_neta = this.cotizacion.suma_aseg * incremento;
            this.cotizacion.primas[i].prima_total = this.cotizacion.suma_aseg * incremento * this.aseguradoras[i].tasa;
  
          } else {
            this.descuentos[i] = riesgoDB.desc_max_com;
            swal( 'No podemos aplicar el descuento', 'Solo puede dar como máximo, el ' + riesgoDB.desc_max_com + '%', 'warning' );
          }
        }
      );
    }



  }

  obtener_descuento( i ) {

    let tasa_descuento = this.cotizacion.primas[i].tasa;

    if ( this.descuentos[i] != null ) {
      tasa_descuento = (1 - this.descuentos[i] / 100 ) * this.cotizacion.primas[i].tasa;
    }

    let tasa_final = tasa_descuento;

    if ( this.descuentos_com[i] != null ) {
      tasa_final = tasa_descuento * (1 - this.descuentos_com[i] / 100);
    }

    return tasa_final;
  }

  enviar_email() {
    swal( 'Debe conectarse a un proveedor de correo para enviar la cotización', ' No se puede enviar la cotización ', 'error' );
  }

}


