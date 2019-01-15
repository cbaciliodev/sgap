import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes: Array<any> = [
    {
      ruc: 20563632110,
      nombre: 'MONTALVO & VEGA CONSTRUCTORES SAC',
      celular: '958741258',
      telefono: '3651482',
      usuario: 'Nepo Keta',
      create_at: new Date()
    },
    {
      ruc: 20509894371,
      nombre: 'SITGES INVERSIONES SA',
      celular: '965412587',
      telefono: '2541487',
      usuario: 'Castañeda Claudia',
      create_at: new Date()
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
