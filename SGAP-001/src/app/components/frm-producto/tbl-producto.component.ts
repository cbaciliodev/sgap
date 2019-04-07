import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tbl-producto',
  templateUrl: './tbl-producto.component.html',
  styles: []
})
export class TblProductoComponent implements OnInit {

  @Input() productos: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}
