import { Component, OnInit } from '@angular/core';
import { ParametroService } from 'src/app/services/service.index';
import { Parametro } from 'src/app/models/parametro.model';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styles: []
})
export class CoberturasComponent implements OnInit {

  parametros: Array<Parametro>;

  constructor( public _parametro: ParametroService ) { }

  ngOnInit() { }

  

}
