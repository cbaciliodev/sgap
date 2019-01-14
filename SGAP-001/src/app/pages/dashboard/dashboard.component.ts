import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Llamando a los servicios');
    init_plugins();
  }

}
