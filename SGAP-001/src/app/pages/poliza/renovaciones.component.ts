import { Component, OnInit } from '@angular/core';
import { Poliza } from '../../models/poliza.model';

@Component({
  selector: 'app-renovaciones',
  templateUrl: './renovaciones.component.html',
  styles: []
})
export class RenovacionesComponent implements OnInit {

  polizas: Array<Poliza> = [
    new Poliza('Ericson Huamaní', 'Ericson Huamaní', 'Ericson Huamaní', new Date(2019, 3, 5), false, null, [ 'Oncológico', 'Vehicular' ], 1250, 'a001' ),
    new Poliza('Eder Manuel', 'Ericson Huamaní', 'Eder Manuel', new Date(2019, 3, 3), false, null, [ 'Vehicular' ], 650, 'a001' ),
    new Poliza('Oswaldo Mayaute', 'Oswaldo Mayaute', 'Ericson Huamaní', new Date(2019, 3, 2), false, null, [ 'Vehicular' ], 800, 'a002' )
  ];

  constructor() { }

  ngOnInit() {
  }

}
