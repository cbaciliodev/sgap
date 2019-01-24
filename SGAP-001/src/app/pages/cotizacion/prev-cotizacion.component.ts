import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cotizacion } from 'src/app/models/cotizacion.model';
import { CotizacionService, UsuarioService, ClienteService, AutoService } from 'src/app/services/service.index';

import { forkJoin } from 'rxjs';
import { Auto } from 'src/app/models/auto.model';
import { Cliente } from 'src/app/models/cliente.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-prev-cotizacion',
  templateUrl: './prev-cotizacion.component.html',
  styles: []
})
export class PrevCotizacionComponent implements OnInit {

  cotizacion: Cotizacion = new Cotizacion();
  auto: Auto = new Auto();
  cliente: Cliente = new Cliente();

  constructor( public activatedRoute: ActivatedRoute,
    public _usuario: UsuarioService,
    public _cliente: ClienteService,
    public _auto: AutoService,
    public _cotizacion: CotizacionService ) { 
    this.activatedRoute.params.subscribe( params => {
      _cotizacion.getById( _usuario.token, params['id'] ).subscribe( _c => {
        this.cotizacion = _c;

        forkJoin(
          _auto.getById( _usuario.token, this.cotizacion.auto._id ),
          _cliente.getById( _usuario.token, this.cotizacion.cliente._id )
        ).pipe(
          map( ([auto]) => { this.auto = auto } )
        )

      });
    });
  }

  ngOnInit() {}

}
