import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model';
import { UsuarioService, PolizaService } from 'src/app/services/service.index';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: []
})
export class PolizaComponent implements OnInit {

  polizas: Array<Poliza> = [];

  constructor(private _usuario: UsuarioService,
    private _poliza: PolizaService) { }

  ngOnInit() {
    this._poliza.listAll(this._usuario.token)
      .subscribe(res => {
        this.polizas = res;
      });
  }

}
