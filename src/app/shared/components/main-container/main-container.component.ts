import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstadoPagina, MainContainerService } from 'src/app/core';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  @Input() titulo = 'Agregue un Título';
  // @Input() descripcion = 'Agregue una Descripción';
  @Input() descripcion = '';
  @Input() col = 'col-md-12';
  @Input() icon = 'bx bx-question-mark';
  @Input() banderaCard = true;
  @Output() recargarChange = new EventEmitter();
  EstadoPagina = EstadoPagina;

  constructor(
    public contenedorService: MainContainerService
  ) {

  }

  get mensaje(): string {
    return this.contenedorService.mensaje
  }

  ngOnInit() {
    // this.contenedorService.cargando();
    // setTimeout(() => {
    //   this.contenedorService.ok();
    // }, 1000);
  }

  recargar() {
    this.recargarChange.emit();
  }
  get bandera(): EstadoPagina {
    return this.contenedorService.banderaEstado;
  }

}
