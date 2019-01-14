import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // Referencias un control html dentro del componente
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 30;

  // Emite un numero para que pueda ser llamado desde fuera del componente
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChanges( newValue: number ) {
    this.progreso = this.isCorrectPercentaje( newValue );
    this.emitValues();
  }

  cambiarValor( valor: number ) {

    this.progreso = this.isCorrectPercentaje( this.progreso + valor );
    this.emitValues();

  }

  isCorrectPercentaje( value: number ) {
    if ( value > 100 ) {
      return 100;
    }

    if ( value < 0 ) {
      return 0;
    }

    return value;
  }

  emitValues() {
    this.txtProgress.nativeElement.value = this.progreso;
    this.txtProgress.nativeElement.focus();
    this.cambioValor.emit( this.progreso );
  }

}
