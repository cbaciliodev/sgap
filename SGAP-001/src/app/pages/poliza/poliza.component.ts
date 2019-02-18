import { Component, OnInit } from '@angular/core';
import { Poliza } from 'src/app/models/poliza.model';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: []
})
export class PolizaComponent implements OnInit {

  polizas: Array<Poliza> = [];

  constructor() { }

  ngOnInit() {
  }

}
